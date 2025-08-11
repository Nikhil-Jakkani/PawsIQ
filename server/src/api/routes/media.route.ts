import express from 'express';
import { userAuth } from '../middlewares/user.auth.js';
import { db } from '../../config/db.js';
import httpStatus from 'http-status';
import { randomUUID } from 'crypto';

const router = express.Router();

// POST /api/v1/media/signed-upload
// body: { bucket: string, entity: 'pet', entity_id: number|string, file_ext: string }
router.post('/signed-upload', userAuth as any, async (req: any, res) => {
  const { bucket, entity, entity_id, file_ext } = req.body || {};
  if (!bucket || !entity || !entity_id || !file_ext) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'bucket, entity, entity_id and file_ext are required' });
  }

  // Generate storage path: userId/entityId/uuid.ext
  const cleanExt = String(file_ext).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const uid = randomUUID();
  const path = `${req.user.user_id}/${entity}/${entity_id}/${uid}.${cleanExt}`;

  const { data, error } = await db.storage
    .from(bucket)
    .createSignedUploadUrl(path);

  if (error || !data) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error?.message || 'Failed to create signed upload URL' });
  }

  return res.status(httpStatus.OK).send({ bucket, path, token: data.token, signedUrl: data.signedUrl });
});

// GET /api/v1/media/signed-url?bucket=pet-photos&path=...
router.get('/signed-url', userAuth as any, async (req: any, res) => {
  const { bucket, path, expiresIn } = req.query as any;
  if (!bucket || !path) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'bucket and path are required' });
  }
  const exp = Math.min(60 * 60, Math.max(60, Number(expiresIn) || 60 * 10)); // 1–60 mins
  const { data, error } = await db.storage
    .from(String(bucket))
    .createSignedUrl(String(path), exp);

  if (error || !data) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error?.message || 'Failed to create signed URL' });
  }
  return res.status(httpStatus.OK).send({ url: data.signedUrl });
});

export default router;
