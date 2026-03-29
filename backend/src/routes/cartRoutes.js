import { Router } from 'express';
import { addToCart, clearCart, getCart, updateCartItem } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);
router.get('/', getCart);
router.post('/', addToCart);
router.put('/:productId', updateCartItem);
router.delete('/', clearCart);

export default router;
