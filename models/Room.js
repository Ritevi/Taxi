const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');

class Room extends Sequelize.Model {}

Room.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    title:{
        type:Sequelize.STRING(64),
        validate:{
            notEmpty:true
        }
    },
    description:{
        type:Sequelize.TEXT
    },
    createdAt: {
        type:Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    sequelize,
    modelName: 'Room',
    timestamps: false
});

exports.Room = Room;

