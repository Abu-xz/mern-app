import express from 'express';
import { login, logout } from '../../controllers/admin/authController.js';
import { fetchUsers } from '../../controllers/admin/adminController.js';

const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);

router.get('/users', fetchUsers);

export default router;