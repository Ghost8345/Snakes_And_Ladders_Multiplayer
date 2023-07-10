import { DataTypes } from "sequelize";
import connection from "../db/dbConnections.js";

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("games", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roomId: {
        type: DataTypes.INTEGER,
      },
      boardId: {
        type: DataTypes.INTEGER,
      },
      createdBy: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING(255),
      },
      lastTurn: {
        type: DataTypes.INTEGER,
      },
      numberOfPlayers: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("games");
  },
};
