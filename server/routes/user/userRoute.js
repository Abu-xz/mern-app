import express from 'express';
import { updateProfile } from '../../controllers/user/userController.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.put('/profile', verifyToken, updateProfile)


export default router;