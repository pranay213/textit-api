import express from 'express';

import { getUsers, createUser, loginUser, logoutUser } from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.post('/', loginUser);
router.post('/', logoutUser);

export default router;
