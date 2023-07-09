import { connection } from "../db/dbConnections.js";
import { DataTypes } from "sequelize";
import { userSchema } from "../../models/user.js";
import { gameSchema } from "../../models/game.js";

export const userGameSchema = connection.define("usergame", {
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

userGameSchema.belongsTo(userSchema, {
  foreignKey: "userId",
  targetKey: "id",
});

userGameSchema.belongsTo(gameSchema, {
  foreignKey: "gameId",
  targetKey: "id",
});
connection.sync();
