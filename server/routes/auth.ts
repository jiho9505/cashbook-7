import express from 'express';
import axios from 'axios';
import jwt from 'json-web-token';
import db from '../database/database';
const router = express.Router();

router.get('/login/github', async (req, res, next) => {
  const code = req.query.code;

  try {
    const {
      data: { token },
    } = await axios.post(`http://localhost:8080/api/auth/login/github/token`, {
      code,
    });
    const result = await db.user.findUnique({
      where: { token },
    });

    if (!result) {
      await db.user.create({
        data: {
          token,
        },
      });
    }
  } catch (e) {
    console.log('e: ', e);
  }
});

router.post('/login/github/token', async (req, res, next) => {
  const { code } = req.body;

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const response = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      code,
      client_id,
      client_secret,
    },
    {
      headers: {
        accept: 'application/json',
      },
    }
  );

  const token = response.data.access_token;

  return res.json({ token });
});

export default router;
