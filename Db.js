// //
// var sequelize = require("./libs/sequelize");
const User = require("./models/User").User;
const Room = require("./models/Room").Room;
const AuthService = require("./libs/AuthService");
// const UsersRoom = require("./models/UsersRoom").UsersRoom;
// const Subscribe = require("./models/Subscribe").Subscribe;
// // const error = require('./libs/Error');
// //
// var foo = async function () {
//   await sequelize.sync({ force: true });
//   var t = await sequelize.transaction();
//   let user = await User.Registration("her", "herherher", "her@gmail.com");
//   // let user = await User.Registration("zalupa","herherher","zalupa@gmail.com");
//   let room = await Room.create({ title: "her", description: "her" });
//
//   await room.setUsers(user.id, { transaction: t });
//
//   t.commit();
// };
//
// foo();
//
// Room.findOne({where:{id:25}}).then((room)=>{
//     room.getJSON().then((rooom)=>{
//         console.log(rooom);
//     })
// })

// User.findOne({ where: { id: 1 } }).then((user) => {
//   console.log(user.getJSON(""));
// });
console.log(
  AuthService.verifyToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMywidXNlcm5hbWUiOiJSaXRldmkyMTM0NTEifSwiaWF0IjoxNTg1NDEzOTg3LCJleHAiOjE1ODU0MzU1ODd9.BUbcvkfv4s3sMMYSJ_Ur932194sCksnSA_t6Gm86ypc"
  )
);
