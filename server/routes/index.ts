import express from 'express';
import historyRouter from './history';
import loginRouter from './login';
const router = express.Router();

router.use('/history', historyRouter);
router.use('/login', loginRouter);
export default router;
