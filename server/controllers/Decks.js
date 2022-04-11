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
    await decksModel.bulkCreate(req.body);
    res.json({
      message: 'Deck Created',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getCurrentDeckById = async (req, res) => {
  try {
    const currentDeck = await decksModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(currentDeck[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};
