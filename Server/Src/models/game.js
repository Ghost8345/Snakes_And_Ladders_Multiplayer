
'use strict';
import { DataTypes } from 'sequelize';
import connection from '../db/dbConnections.js';
import User from '../models/user.js';
import Board from '../models/board.js';
const Game = connection.define('game', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roomId:{
      type:DataTypes.STRING,
    } ,
    boardId: {
      type:DataTypes.INTEGER
    },
    createdBy:{
      type:DataTypes.INTEGER
    } ,
    color:{
      type:DataTypes.STRING
    } ,
    status: {
      type:DataTypes.STRING
    },
    lastTurn: {
      type:DataTypes.INTEGER
    },
    numberOfPlayers:{
      type:DataTypes.INTEGER
    } 
  });
  Game.belongsTo(User, {
    foreignKey: 'createdBy',
    targetKey: 'id',
    onDelete:'CASCADE'
  });
  
  Game.belongsTo(User, {
    foreignKey: 'lastTurn',
    targetKey: 'id',
    onDelete:'CASCADE'
  });
  Game.belongsTo(Board, {
    foreignKey: 'boardId',
    targetKey: 'id',
    onDelete:'CASCADE'
  });
  connection.sync();
  
export default Game;


