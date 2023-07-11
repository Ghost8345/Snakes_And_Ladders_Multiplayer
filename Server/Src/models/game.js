import { Model, DataTypes } from 'sequelize';
import connection from '../db/dbConnections.js';

class Game extends Model {
  static associate(models) {
    // Define associations here
  }
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roomId: DataTypes.STRING,
    boardId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    color: DataTypes.STRING,
    status: DataTypes.STRING,
    lastTurn: DataTypes.INTEGER,
    numberOfPlayers: DataTypes.INTEGER,
  },
  {
    sequelize: connection,
    modelName: 'Game',
    tableName: 'games',
  }
);

export default Game;
