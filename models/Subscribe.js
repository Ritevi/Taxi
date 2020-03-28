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
  },
  {
    sequelize,
    modelName: "Subscribe",
    timestamps: false,
  }
);

exports.Subscribe = Subscribe;
