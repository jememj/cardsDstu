/* eslint-disable import/extensions */
import express from 'express';

import {
  getAllCards,
  addCard,
  getCardById,
  getCardsByDeckId,
  updateCard,
  deleteCard,
} from '../controllers/CardsController.js';
import {
  getAllDecks,
  addDeck,
  getCurrentDeckById,
  deleteDeck,
} from '../controllers/DecksController.js';

const router = express.Router();

router.get('/cards', getAllCards);
router.get('/cards/:id', getCardById);
router.get('/cards/byDeckId/:id', getCardsByDeckId);
router.post('/cards', addCard);
router.patch('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

router.get('/decks', getAllDecks);
router.get('/currentDecks/:id', getCurrentDeckById);
router.post('/decks', addDeck);
router.delete('/decks/:id', deleteDeck);

export default router;
