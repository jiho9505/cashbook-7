import express from 'express';

import db from '../database/database';
import { checkToken } from '../middleware/check-token';

const router = express.Router();

/**
 * AccountHistory 를 만들어 줍니다.
 */
router.post('/', checkToken(), async (req: any, res) => {
  try {
    const { type, price, expenditureDay, categoryId, payMethodId } = req.body;

    await db.accountHistory.create({
      data: {
        userId: req.id,
        price: price * 1,
        type,
        expenditureDay,
        categoryId: categoryId * 1,
        payMethodId: payMethodId * 1,
      },
    });

    return res.json({ httpStatus: 'OK' });
  } catch (error) {
    new Error(error);
    return res.json({ httpStatus: 'Failed' });
  }
});

export default router;
