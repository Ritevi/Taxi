const util = require("util");
var Sequelize = require("sequelize");

function CustomError(name, code, status, message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, CustomError);
  this.name = name;
  this.code = code;
  this.status = status || 500;
  this.message = message || [name, code].join(" ");
}

util.inherits(CustomError, Error);

CustomError.prototype.SeqError = function (err) {
  this.message = err.errors.map((elem) => {
    return elem.path;
  });
  return this;
};

CustomError.SeqInCustom = function (err) {
  console.log(err);
  let newErr;
  if (err instanceof Sequelize.DatabaseError) {
    newErr = new CustomError("DbError", err.original.code, 500); //FIX
    newErr.stack = err.stack;
    return newErr;
  } else if (err instanceof Sequelize.ValidationError) {
    newErr = new CustomError("AuthError", "VALIDATION", 401).SeqError(err);
    newErr.stack = err.stack;
    return newErr;
  } else {
    return err;
  }
};

CustomError.prototype.toJSON = function () {
  let { name, code, status, message } = this;
  return { name, code, status, message };
};

CustomError.prototype.name = "CustomError";

module.exports = CustomError;
