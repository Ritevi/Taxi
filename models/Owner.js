const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');
const User = require('./User').User;
const Room = require('./Room').Room;

class Owner extends Sequelize.Model {}

Owner.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    }
}, {
    sequelize,
    modelName: 'Owner',
    timestamps: false
});

Room.belongsTo(User,{through:Owner,as: 'owner',constraints: false, allowNull:true, defaultValue:null});
User.belongsTo(Room,{through:Owner,as: 'ownerRoom',constraints: false, allowNull:true, defaultValue:null});

exports.Owner = Owner;