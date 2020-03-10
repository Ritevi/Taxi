
var sequelize = require('./libs/sequelize');
const User = require('./models/User').User;
const Room = require('./models/Room').Room;
const UsersRoom = require('./models/UsersRoom').UsersRoom;




var foo = async function(){
    await sequelize.sync({alter:true});
        let user1 =await User.findOne({where:{
            username:"Ritevi"
        }});
    // let user2 = await User.findOne({where:{
    //         username:"name1"
    //     }});
    //
    // let room = await Room.findOne({where:{title:"asdasdss"}});
    // let UsersRoom = await room.getUsers();
    // console.log(UsersRoom);
    let room = await Room.create({title:"aabbb"});
    await room.save();
    console.log(await user1.addRoom(room));
}

foo();