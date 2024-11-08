import express from "express";
import { signIn, signOut, signUp } from "../controllers/userControlller.js";

const router = express.Router()

router.post('/register', signUp)
router.post('/login', signIn)
router.post('/logout', signOut)

export default router;