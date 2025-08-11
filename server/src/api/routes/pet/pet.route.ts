import express from 'express';
import httpStatus from 'http-status';
import { userAuth } from '../../middlewares/user.auth.js';
import { db } from '../../../config/db.js';

const router = express.Router();

// POST /api/v1/pets
// body: { name: string, type?: string, breed?: string, gender?: string, birthdate?: string, color?: string }
router.post('/', userAuth as any, async (req: any, res) => {
  try {
    const { name, type, breed, gender, birthdate, color } = req.body || {};
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
