import connection from "../db/dbconnection.js";
import {DataTypes } from "sequelize";
export const userSchema = connection.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    ,
    userName: {
        type: DataTypes.STRING(50)
    },
    password: {
        type: DataTypes.STRING(50)

    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});