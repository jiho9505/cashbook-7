import express from 'express';
import authRouter from './auth';
import paymentRouter from './pay-method';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/payment', paymentRouter);

export default router;
