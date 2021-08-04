import { NextFunction, Request, Response } from 'express';

import jwt, { JwtPayload } from 'jsonwebtoken';

/**
 * 토큰이 없거나,
 * 유효하지 않거나,
 * 만료된 토큰일 경우 에러를 보냅니다.
 */
export const checkToken = () => (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.header('authorization')?.split(' ')[1];
    if (!token) throw { message: 'NOT_RECEIVE_TOKEN' };

    const { payload } = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
    req.id = payload.id;
    next();
  } catch (error) {
    if (error.message === 'NOT_RECEIVE_TOKEN') {
      return res.status(400).json({ status: 'error', message: error.message });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ status: 'error', message: 'RECEIVE_INVALID_TOKEN' });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ status: 'error', message: 'RECEIVE_EXPIRED_TOKEN' });
    }

    res.status(500).json({ status: 'error', message: 'UNDEFINED_SERVER_ERROR' });
  }
};
