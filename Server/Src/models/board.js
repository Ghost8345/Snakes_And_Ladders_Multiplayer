import connection from "../db/dbConnections.js";
import {DataTypes } from "sequelize";

export const boardSchema = connection.define("board", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    ,
    imagePath:{
        type:DataTypes.STRING(255)
    }
});
connection.sync();