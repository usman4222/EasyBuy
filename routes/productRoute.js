import express from "express";
import { authorizeRole, isAuthenticatedUser } from "../middleware/authUser.js";
import { createProduct, getProducts } from "../controllers/productController.js";

const router = express.Router()

router.post('/admin/create-product',  isAuthenticatedUser, authorizeRole("admin"), createProduct )
router.get('/admin/get-product',  isAuthenticatedUser, authorizeRole("admin"), getProducts )


export default router;