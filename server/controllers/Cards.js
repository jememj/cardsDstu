import CardsModel from "../models/model.js";

export const getAllCards = async (req, res) => {
  try {
    const cards = await CardsModel.findAll();
    res.json(cards);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getCardById = async (req, res) => {
  try {
    const card = await CardsModel.findAll({
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
    await CardsModel.create(req.body);
    res.json({
      message: "Card Created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateCard = async (req, res) => {
  try {
    await CardsModel.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Cards Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    await CardsModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Card Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
