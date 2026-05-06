import express from 'express';
import {createUser, deleteUser, getAllUsers, getstatus, getUserById, searchUsers, updateUser} from '../controllers/userController.js';

const router = express.Router();

router.get('/status', getstatus);
router.get('/search/:query', searchUsers);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;