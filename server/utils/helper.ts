import jwt from 'jsonwebtoken';

/**
 * payload를 감싸 토큰을 만들어 줍니다.
 * 기간은 각각 access 는 30분, refresh 는 1주일입니다.
 */

const ACCESS_TOKEN_EXPIRE_DURATION = '30m';
const REFRESH_TOKEN_EXPIRE_DURATION = '1w';

export const createJWTToken = (payload: any) => {
  const SECRET_KEY: string = process.env.SECRET_KEY as string;

  const accessToken = jwt.sign({ payload }, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRE_DURATION });
  const refreshToken = jwt.sign({ payload }, SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRE_DURATION });

  return { accessToken, refreshToken };
};
