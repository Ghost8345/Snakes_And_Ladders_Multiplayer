import { Sequelize, DataTypes } from "sequelize";
const connection = new Sequelize("snackladdergame", "root", "", {
    host: "localhost",
    dialect: "mysql"
})


try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}




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
export default connection; 