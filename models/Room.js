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
    maxSub:{
        type:Sequelize.INTEGER,
        defaultValue:4,
        validate:{
            max:4 //check
        }
    },
    StartTime:{
        type:Sequelize.DATE
    },
    Close:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
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

Room.createRoom = async function(title,description,StartTime,userId){
    const t = await sequelize.transaction();
    try{
        let room = await Room.create({title,description,StartTime},{transaction:t});
        if(room){
            room.addOwner(userId,{transaction:t});
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


Room.prototype.getJSON = async function(Attr){
    const UsersAttr = Attr||[];
    var json = await this.toJSON();
    json.Users = await this.getUsers().map((user)=>{return user.getJSON(UsersAttr)});
    json.Subs =await this.getSubscriber().map((user)=>{return user.getJSON(UsersAttr)});
    return json;
};

Room.findRoom = async function(roomId){
    try{
        const room = await Room.findOne({where: {id: roomId}});
        if(room){
            return room;
        } else {
            throw new error("Room","NO_ROOM",404);
        }
    } catch (err) {
        throw new error.SeqInCustom(err);
    };
};

Room.join = async function(roomId,userId){
    try{
        const room = await Room.findRoom(roomId);
        await room.addUser(userId);
        return room;
    } catch (err) {
        throw new error.SeqInCustom(err);
    }
};

Room.quit = async function(roomId,userId){
    try{
        const room = await Room.findRoom(roomId);
        await room.removeUser(userId);
        return room;
    } catch (err) {
        throw new error.SeqInCustom(err);
    }
};

Room.subscribe = async function(roomId,userId){
    try{
        const room = await Room.findRoom(roomId);
        if(room.countSubscriber >room.maxSub) throw new error("Room","MAX_COUNT_OF_SUB",400);
        await room.addSubscriber(userId);
        return room;
    } catch (err) {
        throw new error.SeqInCustom(err);
    }
};

Room.unsubscribe = async function(roomId,userId){
    try{
        const room = await Room.findRoom(roomId);
        await room.removeSubscriber(userId);
        return room;
    } catch (err) {
        throw new error.SeqInCustom(err);
    }
};


Room.deleteRoom = async function(roomId,userId){
  try{
      const room = await Room.findRoom(roomId);
      if(room.getOwners())
      room.destroy();
      return room;
  } catch (err) {
      throw new error.SeqInCustom(err);
  }
};

exports.Room = Room;

