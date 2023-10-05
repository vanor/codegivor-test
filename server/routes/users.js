import express from "express";

import auth from "../middlewares/auth.js";
import { getUsers, signin, signup } from "../controllers/users.js";

const router = express.Router();

router.get('/', auth, getUsers);
router.post('/signin', signin);
router.post('/signup', signup);

export default router;