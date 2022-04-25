/* eslint-disable import/extensions */

import { Sequelize } from 'sequelize';

import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Card = db.define(
  'cards',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    answer: {
      type: DataTypes.STRING,
    },
    deckId: {
      type: DataTypes.STRING,
    },
    pos: {
      type: DataTypes.INTEGER,
    },
    question: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  },
);
export default Card;
