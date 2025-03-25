import express from 'express';
import { login, logout } from '../../controllers/admin/authController.js';
import { fetchUsers, deleteUser, updateUser, createUser, searchUser } from '../../controllers/admin/adminController.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.post('/login', login);
router.get('/logout',verifyToken, logout);

router.post('/create-user',verifyToken, createUser);
router.get('/search/:user',verifyToken, searchUser)
router.get('/users',verifyToken, fetchUsers);
router.put('/users/:id',verifyToken, updateUser)
router.delete('/users/:id',verifyToken, deleteUser)

export default router;