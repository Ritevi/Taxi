const Sequelize = require("sequelize");
const sequelize = require("../libs/sequelize");

class Subscribe extends Sequelize.Model {}

Subscribe.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "Subscribe",
    timestamps: false,
  }
);

exports.Subscribe = Subscribe;
