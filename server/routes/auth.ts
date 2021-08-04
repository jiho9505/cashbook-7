import express from 'express';
import axios from 'axios';
import db from '../database/database';
import { createJWTToken } from '../utils/helper';
import url from 'url';

// Type
type ClientCode = string;
type Token = string;
type JWT = {
  accessToken: Token;
  refreshToken: Token;
};
type GithubId = number;
type UserRecord = {
  id: number;
  githubId: number;
};

const BASE_URL = process.env.BASE_URL;
const router = express.Router();

router.get('/login/github', async (req, res, next) => {
  const code = req.query.code;

  try {
    const accessToken = await getGithubUserAccessToken(code as string);
    const githubId = await getUserGithubId(accessToken);
    let userRecord: UserRecord | null = await findUserRecordOnDB(githubId);
    if (!userRecord) userRecord = await createUserRecordOnDB(githubId);

    const tokens = createJWTToken(userRecord);
    const url = getRedirectURL(tokens as JWT);
    res.redirect(url);
  } catch (error) {
    throw new Error(error);
  }
});

/**
 * BASE_URL에
 * token 정보를 쿼리로 추가해서
 * redirect URL을 만듭니다.
 */
const getRedirectURL = (tokens: JWT) => {
  return url.format({
    pathname: BASE_URL,
    query: { access: tokens.accessToken, refresh: tokens.refreshToken },
  });
};

/**
 * githubID를 받아서
 * DB에 해당 githubID를 가지는 유저 레코드를 생성하여 반환합니다.
 */
const createUserRecordOnDB = async (githubId: GithubId): Promise<UserRecord> => {
  const user = await db.user.create({ data: { githubId } });
  return user;
};

/**
 * DB User 테이블의 githubID 필드를 조회하여,
 * 인자와 일치하는 유저가 있는지 확인합니다.
 * 만약 없을 경우, null을 반환합니다.
 */
const findUserRecordOnDB = async (githubId: GithubId): Promise<UserRecord | null> => {
  const userRecord = await db.user.findUnique({ where: { githubId } });
  return userRecord;
};

/**
 * access 토큰을 받아,
 * 깃헙 유저의 유니크한 아이디를 반환합니다.
 */
const getUserGithubId = async (token: Token): Promise<GithubId> => {
  const {
    data: { id: githubId },
  } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  return githubId;
};

/**
 * Client가 보내준 코드를 해석하여,
 * 유저의 github access token을 얻어서 반환합니다.
 */
const getGithubUserAccessToken = async (code: ClientCode): Promise<Token> => {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const { data } = await axios.post(
    'https://github.com/login/oauth/access_token',
    { code, client_id, client_secret },
    { headers: { accept: 'application/json' } }
  );

  const token = data.access_token;
  return token;
};

export default router;
