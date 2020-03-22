//
// var sequelize = require('./libs/sequelize');
// const User = require('./models/User').User;
// const Room = require('./models/Room').Room;
// const UsersRoom = require('./models/UsersRoom').UsersRoom;
// const Subscribe = require('./models/Subscribe').Subscribe;
// const error = require('./libs/Error');
//
// var foo = async function(){
//     await sequelize.sync({force:true});
//     var t = await sequelize.transaction();
//     let user = await User.Registration("her","herherher","her@gmail.com");
//     // let user = await User.Registration("zalupa","herherher","zalupa@gmail.com");
//     let room = await Room.create({title:"her",description:"her"});
//
//     await room.setUsers(user.id,{transaction:t});
//
//     t.commit();
//
// };
//
//
// foo();
