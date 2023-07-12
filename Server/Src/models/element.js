'use strict';
import { Model, DataTypes } from 'sequelize';
import connection from '../db/dbConnections.js';
import Board from '../models/board.js';

const Element = connection.define('element', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  goFrom: {
      type:DataTypes.INTEGER
    },
    goTo: {
      type:DataTypes.INTEGER
    },
    boardId: {
      type:DataTypes.INTEGER
    }
  });
  Element.belongsTo(Board, {
    foreignKey: 'boardId',
    targetKey: 'id',
    onDelete:'CASCADE'
  });
  connection.sync();
  
export default Element;
