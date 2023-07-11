'use strict';
import { Model, DataTypes } from 'sequelize';
import connection from '../db/dbConnections.js';

class Element extends Model {
  static associate(models) {
    // Define associations here
  }
}

Element.init(
  {
    goFrom: DataTypes.INTEGER,
    goTo: DataTypes.INTEGER,
    boardId: DataTypes.INTEGER,
  },
  {
    sequelize: connection,
    modelName: 'Element',
  }
);

export default Element;
