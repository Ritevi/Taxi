const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');
const User = require('./User').User;
const CustomError = require('../libs/Error');

class Comment extends Sequelize.Model {}

Comment.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    body:{
        type:Sequelize.TEXT
    },
    createdAt: {
        type:Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    sequelize,
    modelName: 'Comment',
    timestamps: false
});


Comment.newComment = async function(body,username) {
    try {
        let user = await User.findOne({where: {username}});
        if (user) {
            let createdComment =  await Comment.create({body,userId:user.id});
            return createdComment;
        } else {
            throw new CustomError("AuthError", "USER_NOT_EXIST");
        }
    } catch (err) {
        throw CustomError.SeqInCustom(err);
    }
};

exports.Comment = Comment;