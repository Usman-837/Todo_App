import express from 'express';
import {createUser, getAllUsers, getstatus, getUserById, searchUsers} from '../controllers/userController.js';

const router = express.Router();

router.get('/status', getstatus);
router.get('/search/:query', searchUsers);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

export default router;