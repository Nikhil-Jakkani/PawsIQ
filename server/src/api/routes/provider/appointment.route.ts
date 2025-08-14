import express from 'express';

// Provider appointment routes were removed in favor of the new PIQ_Appointments schema
// Keeping an empty router to avoid import errors while preserving potential future extension.
const router = express.Router();

export default router;
