import { DataTypes } from "sequelize";
import connection from "../db/dbConnections.js";
export const gameSchema = connection.define("game", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roomId: {
        type: DataTypes.INTEGER
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
    numberOfPlayers: {
        type: DataTypes.INTEGER
    }
});
