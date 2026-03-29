import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);
router.post('/', createOrder);
router.get('/my', getMyOrders);
router.get('/', adminOnly, getAllOrders);
router.put('/:id/status', adminOnly, updateOrderStatus);

export default router;
