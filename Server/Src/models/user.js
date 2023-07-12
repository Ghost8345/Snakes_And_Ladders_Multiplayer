'use strict';
import { DataTypes } from 'sequelize';
import connection from '../db/dbConnections.js';

const User = connection.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING(50),
    unique:true
  },
  password: {
    type: DataTypes.STRING(255),
  }
});

connection.sync();

export default User;