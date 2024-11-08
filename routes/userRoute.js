import express from "express";
import { getAllUsers, getUserDetails, signIn, signOut, signUp, updateUserDetails } from "../controllers/userControlller.js";
import { authorizeRole, isAuthenticatedUser } from "../middleware/authUser.js";

const router = express.Router()

router.post('/register', signUp)
router.post('/login', signIn)
router.post('/logout', signOut)  
router.get('/me/:userId', isAuthenticatedUser, getUserDetails)
router.put('/me/update/:userId', isAuthenticatedUser, updateUserDetails)
router.get('/admin/users',  isAuthenticatedUser, authorizeRole("admin"), getAllUsers )


export default router;