import { Router } from 'express';
import auth from '../middlewares/auth';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../controllers/watchlistController';

const router = Router();

router.get('/', auth, getWatchlist);
router.post('/', auth, addToWatchlist);
router.delete('/', auth, removeFromWatchlist);

export default router;
