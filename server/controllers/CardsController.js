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
export const getCardsByDeckId = async (req, res) => {
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

export const addCards = async (req, res) => {
  console.log('cards add', req.body);
  try {
    const card = await cardsModel.bulkCreate(req.body);
    res.json(card);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateCard = async (req, res) => {
  try {
    const card = await req.body.map((i) =>
      cardsModel.update(i, {
        where: {
          id: i.id,
        },
      }),
    );
    res.json(card);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const card = await cardsModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(card);
  } catch (error) {
    res.json({ message: error.message });
  }
};
