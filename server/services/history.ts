import { Request, Response, NextFunction } from 'express';
import { historyRepo } from '../repository/history';

const getHistoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await historyRepo.create();

    return res.json({
      data,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export { getHistoryById };
