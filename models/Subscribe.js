const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');
const User = require('./User').User;
const Room = require('./Room').Room;

class Subscribe extends Sequelize.Model {}

Subscribe.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    }
}, {
    sequelize,
    modelName: 'Subscribe',
    timestamps: false
});


User.belongsToMany(Room, { through: Subscribe});
Room.belongsToMany(User, {through: Subscribe });

exports.Subscribe = Subscribe;