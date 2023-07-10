
import { boardSchema } from "../models/board.js";
import connection from "../db/dbConnections.js";
import { DataTypes } from "sequelize";
import { gameSchema } from "../models/game.js";

export const elementSchema = connection.define("element", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  goFrom: {
    type: DataTypes.INTEGER,
  },
  goTo: {
    type: DataTypes.INTEGER,
  },
  boardId: {
    type: DataTypes.INTEGER,
  },
});

gameSchema.belongsTo(boardSchema, {
  foreignKey: "boardId",
  targetKey: "id",
});

connection.sync();
