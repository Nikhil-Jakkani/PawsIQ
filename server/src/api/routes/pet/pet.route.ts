import express from 'express';
import httpStatus from 'http-status';
import { userAuth } from '../../middlewares/user.auth.js';
import { db } from '../../../config/db.js';

const router = express.Router();

// POST /api/v1/pets
// body: { name: string, type?: string, breed?: string, gender?: string, birthdate?: string, color?: string }
router.post('/', userAuth as any, async (req: any, res) => {
  try {
    // Accept both camelCase and pet_* keys from frontend
    const name = req.body?.name ?? req.body?.pet_name;
    const type = req.body?.type ?? req.body?.pet_type ?? req.body?.pet_species;
    const breed = req.body?.breed ?? req.body?.pet_breed;
    const gender = req.body?.gender ?? req.body?.pet_gender;
    const birthdate = req.body?.birthdate ?? req.body?.pet_dob;
    const color = req.body?.color ?? req.body?.pet_colour;
    if (!name) return res.status(httpStatus.BAD_REQUEST).send({ message: 'name is required' });

    // Build insert payload conservatively to avoid column mismatches
    const insert: Record<string, any> = {
      user_id: req.user.user_id,
      pet_name: name,
      last_updated_dtm: new Date(),
    };
    if (type) insert.pet_type = type;
    if (breed) insert.pet_breed = breed;
    if (gender) insert.pet_gender = gender;
    if (birthdate) insert.pet_dob = birthdate;
    if (color) insert.pet_colour = color;

    const { data: created, error } = await db
      .from('PIQ_Pets')
      .insert(insert)
      .select('*')
      .single();

    if (error || !created) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error?.message || 'Failed to create pet' });
    return res.status(httpStatus.CREATED).send(created);
  } catch (e: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e?.message || 'Failed to create pet' });
  }
});

// GET /api/v1/pets/user/:userId - fetch all pets for a given user
router.get('/user/:userId', userAuth as any, async (req: any, res) => {
  try {
    const userId = Number(req.params.userId);
    if (!userId) return res.status(httpStatus.BAD_REQUEST).send({ message: 'userId is required' });

    // Only allow the authenticated user to fetch their own pets
    if (Number(req.user?.user_id) !== userId) {
      return res.status(httpStatus.FORBIDDEN).send({ message: 'Forbidden' });
    }

    const { data: pets, error } = await db
      .from('PIQ_Pets')
      .select('*')
      .eq('user_id', userId);

    if (error) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message || 'Failed to fetch pets' });

    // Fetch user to enrich owner details
    const { data: user, error: userErr } = await db
      .from('PIQ_User')
      .select('user_full_name, user_email_id, user_phone_number')
      .eq('user_id', userId)
      .single();

    // Build a response shape compatible with the frontend expectations
    const enriched = (pets || []).map((p: any) => {
      // Compute age in years from DOB
      let ageYears: number | null = null;
      if (p?.pet_dob) {
        const dob = new Date(p.pet_dob);
        const now = new Date();
        ageYears = Math.max(0, Math.floor((now.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25)));
      }

      // Owner name split (best-effort)
      const fullName = user?.user_full_name || '';
      const first = fullName.split(' ')[0] || '';
      const last = fullName.split(' ').slice(1).join(' ') || '';

      return {
        // Raw DB fields
        ...p,
        // Alias to UI-friendly properties used across the grid
        id: p.pet_id,
        name: p.pet_name,
        species: p.pet_species ?? p.pet_type ?? '',
        breed: p.pet_breed ?? '',
        gender: p.pet_gender ?? 'Unknown',
        age: ageYears ?? undefined,
        profileImage: p.pet_image ?? `https://source.unsplash.com/random/400x300?${encodeURIComponent(p.pet_type || 'pet')}`,
        status: 'active',
        microchipped: p.microchipped ?? false,
        neutered: p.neutered ?? false,
        vaccinated: p.vaccinated ?? false,
        lastUpdated: p.last_updated_dtm ?? undefined,
        // Modal/detail expectations
        pet_species: p.pet_species ?? p.pet_type ?? '',
        // Provide a small profile array with age for UI access like profile[0]?.pet_age
        profile: ageYears != null ? [{ pet_age: ageYears }] : [],
        // Owner projections used by UI
        ownerName: fullName || undefined,
        ownerEmail: user?.user_email_id || undefined,
        ownerPhone: user?.user_phone_number || undefined,
        user: {
          user_first_name: first,
          user_last_name: last,
          user_email: user?.user_email_id || '',
        },
        // Lists used by the UI chips (default empty)
        medications: Array.isArray(p.medications) ? p.medications : [],
        dietaryRestrictions: Array.isArray(p.dietaryRestrictions) ? p.dietaryRestrictions : [],
      };
    });

    return res.status(httpStatus.OK).send(enriched);
  } catch (e: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e?.message || 'Failed to fetch pets' });
  }
});

// PATCH /api/v1/pets/:petId - update pet fields
router.patch('/:petId', userAuth as any, async (req: any, res) => {
  try {
    const petId = Number(req.params.petId);
    if (!petId) return res.status(httpStatus.BAD_REQUEST).send({ message: 'petId is required' });

    // Ensure pet belongs to user
    const { data: existing, error: selErr } = await db
      .from('PIQ_Pets')
      .select('pet_id, user_id')
      .eq('pet_id', petId)
      .single();
    if (selErr || !existing) return res.status(httpStatus.NOT_FOUND).send({ message: 'Pet not found' });
    if (Number(existing.user_id) !== Number(req.user.user_id)) return res.status(httpStatus.FORBIDDEN).send({ message: 'Forbidden' });

    // Build update payload from either camelCase or pet_* keys
    const upd: Record<string, any> = { last_updated_dtm: new Date() };
    const body = req.body || {};
    if (body.name ?? body.pet_name) upd.pet_name = body.name ?? body.pet_name;
    if (body.type ?? body.pet_type ?? body.pet_species) upd.pet_type = body.type ?? body.pet_type ?? body.pet_species;
    if (body.breed ?? body.pet_breed) upd.pet_breed = body.breed ?? body.pet_breed;
    if (body.gender ?? body.pet_gender) upd.pet_gender = body.gender ?? body.pet_gender;
    if (body.birthdate ?? body.pet_dob) upd.pet_dob = body.birthdate ?? body.pet_dob;
    if (body.color ?? body.pet_colour) upd.pet_colour = body.color ?? body.pet_colour;
    if (body.pet_image ?? body.profileImage) upd.pet_image = body.pet_image ?? body.profileImage;

    const { data: updated, error } = await db
      .from('PIQ_Pets')
      .update(upd)
      .eq('pet_id', petId)
      .select('*'); // Return array to match frontend usage updatedPet[0]

    if (error) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message || 'Failed to update pet' });
    return res.status(httpStatus.OK).send(updated || []);
  } catch (e: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e?.message || 'Failed to update pet' });
  }
});

// DELETE /api/v1/pets/:petId - delete a pet
router.delete('/:petId', userAuth as any, async (req: any, res) => {
  try {
    const petId = Number(req.params.petId);
    if (!petId) return res.status(httpStatus.BAD_REQUEST).send({ message: 'petId is required' });

    // Ensure pet belongs to user
    const { data: existing, error: selErr } = await db
      .from('PIQ_Pets')
      .select('pet_id, user_id')
      .eq('pet_id', petId)
      .single();
    if (selErr || !existing) return res.status(httpStatus.NOT_FOUND).send({ message: 'Pet not found' });
    if (Number(existing.user_id) !== Number(req.user.user_id)) return res.status(httpStatus.FORBIDDEN).send({ message: 'Forbidden' });

    const { error } = await db
      .from('PIQ_Pets')
      .delete()
      .eq('pet_id', petId);

    if (error) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message || 'Failed to delete pet' });
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (e: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e?.message || 'Failed to delete pet' });
  }
});
// PUT /api/v1/pets/:petId/image
// body: { path: string }
router.put('/:petId/image', userAuth as any, async (req: any, res) => {
  const petId = Number(req.params.petId);
  const { path } = req.body || {};
  if (!petId || !path) return res.status(httpStatus.BAD_REQUEST).send({ message: 'petId and path are required' });

  // Ensure pet belongs to user
  const { data: pet, error: selErr } = await db.from('PIQ_Pets').select('pet_id, user_id').eq('pet_id', petId).single();
  if (selErr || !pet) return res.status(httpStatus.NOT_FOUND).send({ message: 'Pet not found' });
  if (Number(pet.user_id) !== Number(req.user.user_id)) return res.status(httpStatus.FORBIDDEN).send({ message: 'Forbidden' });

  const { data: updated, error } = await db
    .from('PIQ_Pets')
    .update({ pet_image: path, last_updated_dtm: new Date() })
    .eq('pet_id', petId)
    .select('*')
    .single();

  if (error || !updated) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error?.message || 'Failed to update pet image' });
  return res.status(httpStatus.OK).send(updated);
});

export default router;
