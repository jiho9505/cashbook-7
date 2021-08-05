import express from 'express';

import db from '../database/database';
import { checkToken } from '../middleware/check-token';

const router = express.Router();

/**
 * req.id로 들어온 유저 id에 대한
 * 모든 category record를 반환합니다.
 */
router.get('/', checkToken(), async (req: any, res) => {
  try {
    const payments = await db.category.findMany({ where: { userId: req.id } });
    return res.json({ payments });
  } catch (error) {
    throw new Error(error);
  }
});

export default router;
