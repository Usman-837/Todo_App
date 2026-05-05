import express from 'express';
import {getstatus} from '../controllers/userController.js';

const router = express.Router();

router.get('/status', getstatus)

export default router;