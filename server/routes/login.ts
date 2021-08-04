import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('check', req);
});

// router.post('/',someThing);

// router.patch('/',someThing);

// router.delete('/', someThing);

export default router;
