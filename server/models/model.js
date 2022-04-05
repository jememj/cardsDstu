import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Card = db.define(
  "Cards",
  {
    answer: {
      type: DataTypes.STRING,
    },
    deckId: {
      type: DataTypes.INTEGER,
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
  }
);

export default Card;
