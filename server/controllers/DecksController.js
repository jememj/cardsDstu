/* eslint-disable import/extensions */
import decksModel from '../models/decksModel.js';

export const getAllDecks = async (req, res) => {
  try {
    const decks = await decksModel.findAll();
    res.json(decks);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const addDeck = async (req, res) => {
  try {
    const deck = await decksModel.bulkCreate(req.body);
    res.json(deck);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getCurrentDeckById = async (req, res) => {
  try {
    const deck = await decksModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(deck[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const deleteDeck = async (req, res) => {
  try {
    const deck = await decksModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deck);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const updateDeck = async (req, res) => {
  try {
    const deck = await decksModel.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    res.json(deck);
  } catch (error) {
    res.json({ message: error.message });
  }
};
