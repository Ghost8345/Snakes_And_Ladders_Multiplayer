'use strict';
import { Model, DataTypes } from 'sequelize';
import connection from '../db/dbConnections.js';

class Board extends Model {
  static associate(models) {
    // Define associations here
  }
}
//
Board.init(
  {
    imagePath: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: 'Board',
  }
);

export default Board;
