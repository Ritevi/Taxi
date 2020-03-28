const Sequelize = require("sequelize");
const sequelize = require("../libs/sequelize");
const User = require("./User").User;
const error = require("../libs/Error");
const UsersRoom = require("./UsersRoom").UsersRoom;
const Subscribe = require("./Subscribe").Subscribe;
const { Op } = require("sequelize");

class Room extends Sequelize.Model {}

Room.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    maxSub: {
      type: Sequelize.INTEGER,
      defaultValue: 4,
      validate: {
        max: 5, //check
      },
    },
    StartTime: {
      type: Sequelize.DATE,
    },
    Close: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    title: {
      type: Sequelize.STRING(64),
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize,
    modelName: "Room",
    timestamps: false,
  }
);

User.belongsToMany(Room, { through: UsersRoom, as: "WillingRoom" });
Room.belongsToMany(User, { through: UsersRoom, as: "Willing" });

User.belongsTo(Room, {
  allowNull: false,
  unique: true,
  as: "OwnerRoom",
  constraints: false,
});
Room.belongsTo(User, {
  allowNull: false,
  unique: true,
  as: "Owner",
  constraints: false,
});

User.belongsToMany(Room, { through: Subscribe, as: "SubRoom" });
Room.belongsToMany(User, { through: Subscribe, as: "Subscriber" });

Room.createRoom = async function (title, description = "", StartTime, userId) {
  const t = await sequelize.transaction();
  StartTime = +StartTime;
  try {
    if (!userId) return new error("Room", "NO_USERID", 400);
    if (!StartTime)
      return new error("Room", "NO_STARTTIME", 400, "add start time to room");
    let room = await Room.create(
      {
        title: title,
        description: description,
        StartTime: StartTime,
      },
      { transaction: t }
    );
    if (room) {
      await room.setOwner(userId, { transaction: t });
      await room.addWilling(userId, { transaction: t });
      await room.addSubscriber(userId, { transaction: t });
      await t.commit();
      return room;
    } else {
      return new error("Room", "ROOM_NOT_CREATED", 500);
    }
  } catch (e) {
    t.rollback();
    throw error.SeqInCustom(e);
  }
};

Room.prototype.getJSON = async function (Attr = []) {
  const UsersAttr = Attr;
  const json = await this.toJSON();
  json.Users = await this.getWilling().map((user) => {
    return user.getJSON(UsersAttr);
  });
  json.Subs = await this.getSubscriber().map((user) => {
    return user.getJSON(UsersAttr);
  });
  return json;
};

Room.findRoom = async function (roomId) {
  try {
    const room = await Room.findByPk(roomId);
    if (room) {
      return room;
    } else {
      throw new error("Room", "NO_ROOM", 404);
    }
  } catch (err) {
    throw error.SeqInCustom(err);
  }
};

Room.join = async function (roomId, userId) {
  try {
    const room = await Room.findRoom(roomId);
    await room.addWilling(userId);
    return room;
  } catch (err) {
    throw error.SeqInCustom(err);
  }
};

Room.quit = async function (roomId, userId) {
  try {
    const room = await Room.findRoom(roomId);
    await room.removeWilling(userId);
    return room;
  } catch (err) {
    throw error.SeqInCustom(err);
  }
};

Room.subscribe = async function (roomId, userId) {
  try {
    const room = await Room.findRoom(roomId);
    if ((await room.countSubscriber()) > room.maxSub)
      throw new error("Room", "MAX_COUNT_OF_SUB", 400);
    await room.addSubscriber(userId);
    return room;
  } catch (err) {
    throw error.SeqInCustom(err);
  }
};

Room.unsubscribe = async function (roomId, userId) {
  try {
    const room = await Room.findRoom(roomId);
    await room.removeSubscriber(userId);
    return room;
  } catch (err) {
    throw error.SeqInCustom(err);
  }
};

Room.deleteRoom = async function (roomId) {
  try {
    const room = await Room.findRoom(roomId);
    await room.destroy();
    return room;
  } catch (err) {
    throw error.SeqInCustom(err);
  }
};

Room.isOwner = async function (roomId, userId) {
  try {
    const room = await Room.findRoom(roomId);
    const Owner = await room.getOwner();
    return Owner.id === userId;
  } catch (err) {
    return error.SeqInCustom(err);
  }
};

Room.getRooms = async function (limit, offset, Closed = null) {
  try {
    let options = {
      limit: limit ? Number(limit) : undefined,
      order: [["createdAt", "DESC"]],
      where: {
        Close: {
          [Op.or]: Closed == null ? [true, false] : [Closed],
        },
      },
      offset: offset ? Number(offset) : undefined,
    };
    const rooms = await Room.findAndCountAll(options);
    return rooms.rows;
  } catch (err) {
    throw error.SeqInCustom(err);
  }
};

exports.Room = Room;
