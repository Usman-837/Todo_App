import express from 'express';
import {getstatus, searchUsers} from '../controllers/userController.js';

const router = express.Router();

router.get('/status', getstatus);
router.get('/search/:query', searchUsers)


export default router;