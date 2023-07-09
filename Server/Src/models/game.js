import { userSchema } from "./user.js";
import { boardSchema } from "./board.js";
import connection from "../db/dbConnections.js";
import {DataTypes } from "sequelize";

export const gameSchema = connection.define("game", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    boardId: {
        type: DataTypes.INTEGER
    },
    createdBy: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING(255)
    },
    lastTurn: {
        type: DataTypes.INTEGER
    },
    numberOfPlayers:{
        type: DataTypes.INTEGER
    }

});
connection.sync();



gameSchema.belongsTo(userSchema, {
    foreignKey: "createdBy",
    targetKey: "id",
  });
  gameSchema.belongsTo(boardSchema, {
    foreignKey: "boardId",
    targetKey: "id",
  });
  gameSchema.belongsTo(userSchema, {
    foreignKey: "lastTurn",
    targetKey: "id",
  });

  connection.sync();