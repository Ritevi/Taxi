const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');
const bcrypt = require("bcrypt");
const CustomError = require('../libs/Error');
const jwt = require('jsonwebtoken');

class User extends Sequelize.Model {}

User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username:{
        type:Sequelize.STRING(64)
    },
    password:{
        type:Sequelize.STRING(64),
        validate:{
            notEmpty:true
        }
    },
    PhotoUrl:{
        type:Sequelize.STRING(128),
    },
    vkId:{
        type:Sequelize.INTEGER(),
        unique:true,
        allowNull:true
    },
    email:{
        type:Sequelize.STRING(),
        unique:true,
        validate:{
            isEmail:true
        }
    },
    createdAt: {
        type:Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: false
});

User.visibleAttr = ["username","id","PhotoUrl","vkId"];


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
    const t = await sequelize.transaction();
    try {
        let user = await User.findOne({where: {email, username}});
        if (user) {
            throw new CustomError("AuthError", "USER_EXIST");
        } else {
            if (password.length >= 6 && password.length <= 32) {
                let hash = await User.asyncGenerateHash(password);
                let createdUser =  await User.create({username:username, password: hash, email:email},{transaction:t});
                if(createdUser){
                    t.commit();
                    return createdUser;
                } else {
                    throw new CustomError("AuthError","USER_NOT_CREATED");
                }

            } else {
                throw new CustomError("AuthError", "NO_VALID_PASSWORD");
            }
        }
    } catch (err) {
        t.rollback();
        throw CustomError.SeqInCustom(err);
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
        throw CustomError.SeqInCustom(err);
    }
};

User.findOrCreateByVK = async function(profile){
    const transaction = await sequelize.transaction();
    try{
        let [user,created] = await User.findOrCreate({
            where:{
                    vkId:profile.id,
                },
            defaults:{
                vkId:profile.id,
                username:profile.displayName,
                PhotoUrl:profile.photos[0].value
            },transaction});
        if(user){
            await transaction.commit();
            return user;
        } else {
            throw new CustomError("AuthError", "NO_USER");
        }
    }catch (err) {
        if(transaction) transaction.rollback();
        throw CustomError.SeqInCustom(err);
    }
};


User.prototype.getJSON = function(Attrs=User.visibleAttr) {
    if(Attrs){
        Attrs = User.visibleAttr;
    }
    const includeAttrs = Attrs;
    var UsersKeys = Object.keys(this.toJSON());
    var result={};
    UsersKeys = UsersKeys.filter((key)=>{
        return includeAttrs.includes(key);
    });

    UsersKeys.forEach((key)=>{
        result[key]=this.get(key);
    });
    return result;
};

User.getUserById = async function(id){
    try {
        const user = await User.findOne({where:{id}});
        if(!user) throw new CustomError("Auth","NO_USER",401);
        return user;
    } catch (err) {
        throw CustomError.SeqInCustom(err);
    }
};

exports.User = User;
