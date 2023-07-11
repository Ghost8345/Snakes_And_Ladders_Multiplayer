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
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
    lastTurn: {
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' },
      defaultValue: null,
    },
    numberOfPlayers: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: connection,
    modelName: 'Game',
    tableName: 'games',
  }
);

export default Game;
