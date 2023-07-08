import { Sequelize,DataTypes } from "sequelize";
const connection =new Sequelize("snackladdergame","root","",{
    host:"localhost",
    dialect:"mysql"
})

export default connection;