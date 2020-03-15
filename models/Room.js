const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');
const User = require('./User').User;
const error = require('../libs/Error');

class Room extends Sequelize.Model {}

Room.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    uuid:{
      type:Sequelize.UUID,
      defaultValue:Sequelize.UUIDV4
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

Room.createRoom = async function(title,description,userId){
    const t = await sequelize.transaction();
    try{
        let room = await Room.create({title,description},{transaction:t});
        if(room){
            room.addUser(userId,{transaction:t});
            room.addSubscriber(userId,{transaction:t});
            t.commit();
            return room;
        } else {
            throw new error("Room","ROOM_NOT_CREATED");
        }

    } catch (e) {
        t.rollback();
        throw new error.SeqInCustom(e);
    }
};


Room.prototype.getJSON = async function(){
    const UsersAttr = ["username","id","displayName","PhotoUrl","vkId"];
    var json = await this.toJSON();
    json.Users = await this.getUsers().map((user)=>{return user.getJSON(UsersAttr)});
    json.Subs =await this.getSubscriber().map((user)=>{return user.getJSON(UsersAttr)});
    return json;
};




exports.Room = Room;

