import express from 'express';

import { getAllCards, addCard, getCardById, updateCard, deleteCard } from '../controllers/Cards';

const CardRouter = express.Router();

CardRouter.get('/cards', getAllCards);
CardRouter.get('/card:id', getCardById);
CardRouter.post('/cards', addCard);
CardRouter.patch('/:id', updateCard);
CardRouter.delete('/:id', deleteCard);

export default CardRouter;
