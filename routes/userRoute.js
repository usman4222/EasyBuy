import express from "express";
import { getUserDetails, signIn, signOut, signUp, updateUserDetails } from "../controllers/userControlller.js";
import { isAuthenticatedUser } from "../middleware/authUser.js";

const router = express.Router()

router.post('/register', signUp)
router.post('/login', signIn)
router.post('/logout', signOut)  
router.get('/me/:userId', isAuthenticatedUser, getUserDetails)
router.put('/me/update/:userId', isAuthenticatedUser, updateUserDetails)


export default router;