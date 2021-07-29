import express from 'express'; 
import {
	getHistoryById
} from '../services/history';
const router = express.Router();


router.get('/', getHistoryById);

// router.post('/',someThing);

// router.patch('/',someThing);

// router.delete('/', someThing);

export default router;