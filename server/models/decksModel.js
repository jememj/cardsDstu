/* eslint-disable import/extensions */
import { Sequelize } from 'sequelize';

import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Decks = db.define(
  'decks',
  {
    background: {
      type: DataTypes.STRING,
    },
    cardsCount: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.INTEGER,
    },
    color: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  },
);

export default Decks;
