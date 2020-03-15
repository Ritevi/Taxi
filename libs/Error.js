const util = require("util");
var Sequelize = require('sequelize');

function CustomError(name,code,status,message,) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, CustomError);
    this.name = name;
    this.code = code;
    this.status = status||500;
    this.message = message||[name,code].join(" ");
}
util.inherits(CustomError, Error);

CustomError.prototype.SeqError = function(err){
    this.message = err.errors.map((elem)=>{
        return elem.path;
    });
    return this;
};

CustomError.SeqInCustom = function(err){
    if(err instanceof Sequelize.DatabaseError) {
        return new CustomError("DbError", err.parent,500, err.message);
    } else if(err instanceof Sequelize.ValidationError) {
        return new CustomError("AuthError", "VALIDATION").SeqError(err);
    } else {
        return err;
    }
};

CustomError.prototype.toJSON = function(){
    let {name,code,status,message} = this;
    return {name,code,status,message};
};


CustomError.prototype.name = 'CustomError';

module.exports = CustomError;