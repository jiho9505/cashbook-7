import express from 'express';

import db from '../database/database';
import { checkToken } from '../middleware/check-token';

const router = express.Router();

type FilterOption = {
  type?: string;
  expenditureDay?: any;
  categoryId?: number;
  payMethodId?: number;
};

/**
 * 필터에 맞는 accountHistory를 반환합니다.
 */
router.get('/', checkToken(), async (req: any, res) => {
  try {
    const opt = generateFilter(req.query);

    const accountHistory = await db.accountHistory.findMany({
      where: { ...opt, userId: req.id },
      include: {
        category: { select: { name: true } },
        payMethod: { select: { id: true, name: true } },
      },
    });
    return res.json({ httpStatus: 'OK', accountHistory });
  } catch (error) {
    new Error(error);
    return res.json({ httpStatus: 'Failed' });
  }
});

/**
 * ORM을 위한 조건에 filter option을 만듭니다.
 */
const generateFilter = (options: any): FilterOption => {
  let opt = { ...options };

  if (opt.expenditureDay) opt = { ...opt, expenditureDay: { contains: opt.expenditureDay } };
  if (opt.categoryId) opt = { ...opt, categoryId: opt.categoryId * 1 };
  if (opt.payMethodId) opt = { ...opt, payMethodId: opt.payMethodId * 1 };

  return opt;
};

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

router.delete('/', checkToken(), async (req: any, res) => {
  try {
    const { accountHistoryId } = req.body;
    await db.accountHistory.delete({ where: { id: accountHistoryId * 1 } });

    return res.json({ httpStatus: 'OK' });
  } catch (error) {
    new Error(error);
    return res.json({ httpStatus: 'Failed' });
  }
});

export default router;
