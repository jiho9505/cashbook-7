import express from 'express'; 
import historyRouter from './history'

const router = express.Router();

router.use('/history', historyRouter);

export default router;