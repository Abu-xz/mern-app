import express from 'express';
import { login, logout } from '../../controllers/admin/authController.js';
import { fetchUsers, deleteUser, updateUser, createUser, searchUser } from '../../controllers/admin/adminController.js';

const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);

router.post('/create-user', createUser);
router.get('/search/:user', searchUser)
router.get('/users', fetchUsers);
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router;