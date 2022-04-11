/* eslint-disable import/extensions */

import cardsModel from '../models/cardModel.js';

export const getAllCards = async (req, res) => {
  try {
    const cards = await cardsModel.findAll();
    res.json(cards);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getCardsByDeck = async (req, res) => {
  try {
    const cards = await cardsModel.findAll({ where: { deckId: req.params.id } });
    res.json(cards);
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const getCardById = async (req, res) => {
  try {
    const card = await cardsModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(card[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const addCard = async (req, res) => {
  try {
    await cardsModel.bulkCreate(req.body);
    res.json({
      message: 'Card Created',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateCard = async (req, res) => {
  try {
    await cardsModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Cards Updated',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    await cardsModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: 'Card Deleted',
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
