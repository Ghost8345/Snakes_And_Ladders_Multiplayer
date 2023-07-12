"use strict";
import { Model, DataTypes } from "sequelize";
import connection from "../db/dbConnections.js";

const Board = connection.define(
  "board",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imagePath: {
      type: DataTypes.STRING,
    }
  }
);

connection.sync();
export default Board;