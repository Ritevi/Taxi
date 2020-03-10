const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');
const bcrypt = require("bcrypt");
const CustomError = require('../libs/Error');

class User extends Sequelize.Model {}

User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username:{
        type:Sequelize.STRING(16),
        unique:true,
        validate:{
            len:[3,16],
            is: ["^[A-Za-z0-9-_]+$",'i']
        }
    },
    password:{
        type:Sequelize.STRING(64),
        validate:{
            notEmpty:true
        }
    },
    email:{
        type:Sequelize.STRING(),
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true,
            notEmpty:true
        }
    },
    createdAt: {
        type:Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    sequelize,
    modelName: 'user',
    timestamps: false
});

User.generateHash = function(password,cb){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, cb);
    });
};

User.asyncGenerateHash = async function(password){
    try {
        let salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
    } catch (err) {
        throw new CustomError("DbError","HASH");
    }

};

User.prototype.validPassword = function(password,cb) {
    bcrypt.compare(password, this.password,cb);
};

User.prototype.asyncValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

User.Registration = async function(username,password,email) {
    try {
        let user = await User.findOne({where: {email, username}});
        if (user) {
            throw new CustomError("AuthError", "USER_EXIST");
        } else {
            if (password.length >= 6 && password.length <= 32) {
                let hash = await User.asyncGenerateHash(password);
                let createdUser =  await User.create({username:username, password: hash, email:email});
                return createdUser;
            } else {
                throw new CustomError("AuthError", "NO_VALID_PASSWORD");
            }
        }
    } catch (err) {
        throw new CustomError.SeqInCustom(err);
    }
};

User.login = async function(email,password){
    try {
        let user = await User.findOne({where:{email}});
        if(user){
            if(await user.asyncValidPassword(password)){
                return user;
            } else {
                throw new CustomError("AuthError", "NO_VALID_PASSWORD");
            }
        } else {
            throw new CustomError("AuthError", "NO_USER");
        }
    } catch (err) {
        throw new CustomError.SeqInCustom(err);
    }
};

exports.User = User;
