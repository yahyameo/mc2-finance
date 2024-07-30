import express from 'express';
import { createAlert, getAlerts, deleteAlert } from '../controllers/alertController';
import auth from '../middlewares/auth';
import { io } from '../app'; // Import the `io` instance from `app.ts`

const router = express.Router();

router.post('/', auth, (req, res) => createAlert(io)(req, res));
router.get('/', auth, getAlerts);
router.delete('/:alertId', auth, (req, res) => deleteAlert(io)(req, res));

export default router;