import express from 'express';
import { getItems, getItemById, createItem, deleteItem, checkoutItems } from '../controllers/item.controller.js';

const router = express.Router();

router.get('/items', getItems);
router.get('/items/:id', getItemById);
router.post('/items', createItem);
router.delete('/items/:id', deleteItem);
router.post('/items/checkedout',checkoutItems)

export default router;
