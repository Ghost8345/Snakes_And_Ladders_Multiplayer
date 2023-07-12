'use strict';
import { DataTypes } from 'sequelize';
import connection from '../db/dbConnections.js';
import User from '../models/user.js';
import Game from '../models/game.js';

const UserGame = connection.define('usergame', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  gameId: {
    type: DataTypes.INTEGER,
  },
  position: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING(255),
  },
  color: {
    type: DataTypes.STRING(255),
  },
});

UserGame.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  onDelete:'CASCADE'
});

UserGame.belongsTo(Game, {
  foreignKey: 'gameId',
  targetKey: 'id',
  onDelete:'CASCADE'
});

connection.sync();

export default UserGame;
