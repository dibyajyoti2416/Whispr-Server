import { Router } from 'express';
import { checkUser, registerUser, verifyOTP } from '../controllers/auth.controller.js';

const router = Router();

router.post('/check', checkUser);
router.post('/register', registerUser);
router.post('/verify', verifyOTP);

export default router;
