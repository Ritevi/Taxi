const Sequelize = require("sequelize");
const sequelize = require("../libs/sequelize");

class InviteToRoom extends Sequelize.Model {}

InviteToRoom.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "InviteToRoom",
    timestamps: false,
  }
);

exports.inviteToRoom = InviteToRoom;
