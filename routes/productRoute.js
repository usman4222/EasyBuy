import express from "express";
import { authorizeRole, isAuthenticatedUser } from "../middleware/authUser.js";
import { createProduct, getAdminProducts, getProducts } from "../controllers/productController.js";

const router = express.Router()

router.post('/admin/create-product',  isAuthenticatedUser, authorizeRole("admin"), createProduct )
router.get('/get-product', getProducts )
router.get('/admin/products',  isAuthenticatedUser, authorizeRole("admin"), getAdminProducts )


export default router;