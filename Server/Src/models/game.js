import { DataTypes } from "sequelize";
import connection from "../db/dbConnections.js";
import { boardSchema } from "./board.js";

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
    NoOfPlayers: {
        type: DataTypes.INTEGER
    }
});

gameSchema.belongsTo(boardSchema, {
    foreignKey: "boardId",
    targetKey: "id"
});

import { userSchema } from "./user.js";

gameSchema.belongsTo(userSchema, {
    foreignKey: "createdBy",
    targetKey: "id"
});

connection.sync();
