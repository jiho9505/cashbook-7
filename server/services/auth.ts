import { Request, Response, NextFunction } from 'express';

const getHistoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = '';

    return res.json({
      data,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export { getHistoryById };
