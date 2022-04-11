/* eslint-disable import/extensions */
import express from 'express';

import {
  getAllCards,
  addCard,
  getCardById,
  getCardsByDeck,
  updateCard,
  deleteCard,
} from '../controllers/Cards.js';
import { getAllDecks, addDeck, getCurrentDeckById } from '../controllers/Decks.js';

const router = express.Router();

router.get('/cards', getAllCards);
router.get('/card:id', getCardById);
router.get('/cards/byDeckId/:id', getCardsByDeck);
router.post('/cards', addCard);
router.patch('/card/:id', updateCard);
router.delete('/card/:id', deleteCard);

router.get('/decks', getAllDecks);
router.post('/decks', addDeck);
router.get('/currentDecks/:id', getCurrentDeckById);

export default router;
