const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');
const User = require('./User').User;
const Room = require('./Room').Room;

class UsersRoom extends Sequelize.Model {}

UsersRoom.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    }
}, {
    sequelize,
    modelName: 'UsersRoom',
    timestamps: false
});


User.belongsToMany(Room, {through: UsersRoom});
Room.belongsToMany(User, {through: UsersRoom });

exports.UsersRoom = UsersRoom;