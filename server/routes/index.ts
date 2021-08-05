import express from 'express';

import accountHistoryRouter from './account-history';
import authRouter from './auth';
import categoryRouter from './category';
import paymentRouter from './pay-method';

const router = express.Router();

router.use('/account-history', accountHistoryRouter);
router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/payment', paymentRouter);

export default router;
