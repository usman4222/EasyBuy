import express from "express"
import { isAuthenticatedUser, authorizeRole } from '../middleware/authUser.js'
import { newOrder, getSingleOrders, myOrders, getAllOrders, updateOrder, deleteOrder } from '../controllers/orderController.js'
const router = express.Router()


router.route('/new-order').post(isAuthenticatedUser, newOrder)
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrders)
router.route('/my-orders').get(isAuthenticatedUser,  myOrders)
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRole("admin"), getAllOrders)
router.route('/admin/update-order-status/:id').put(isAuthenticatedUser, authorizeRole("admin"), updateOrder)
router.route('/admin/delete-order/:id').delete(isAuthenticatedUser,  authorizeRole("admin"), deleteOrder)

export default router;