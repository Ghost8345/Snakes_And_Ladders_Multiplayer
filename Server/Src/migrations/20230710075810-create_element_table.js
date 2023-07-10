import { DataTypes } from 'sequelize';

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('elements', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    goFrom: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    goTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'boards',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('elements');
};
