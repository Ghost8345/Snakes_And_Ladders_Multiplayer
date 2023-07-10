import { Sequelize, DataTypes } from "sequelize";
const connection = new Sequelize("snackladdergame", "root", "8520789", {
    host: "localhost",
    dialect: "mysql"
})


try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}




export default connection; 