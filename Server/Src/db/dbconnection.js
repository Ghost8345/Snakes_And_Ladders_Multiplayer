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



<<<<<<< HEAD
=======

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

>>>>>>> ea0c1978a46dbf2f963e3a5c6c22b55a341a2f64
connection.sync();
export default connection; 