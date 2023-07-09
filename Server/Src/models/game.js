import { userSchema } from "./user";
import { connection } from "../db/dbConnections.js";
import { DataTypes } from "sequelize";

export const gameSchema = connection.define("game", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    ,
    boardId: {
        type: DataTypes.INTEGER,
    },
    createdBy: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING(255)
    },
    lastTurn: {
        type: DataTypes.INTEGER
    }

});



gameSchema.belongsTo(userSchema, {
    foreignKey: "createdBy",
    targetKey: "id",
});

connection.sync();
