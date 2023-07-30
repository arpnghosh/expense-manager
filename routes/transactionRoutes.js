import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getTransaction, postTransaction, putTransaction} from '../controllers/transactionController.js'

const router = express.Router();

router.get('/',protect, getTransaction)

router.post('/',protect, postTransaction)

router.put('/:id',protect, putTransaction)

export default router;
