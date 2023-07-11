import { DataTypes } from "sequelize";
import connection from "../db/dbConnections.js";
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

connection.sync();
