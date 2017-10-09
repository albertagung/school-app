'use strict';
let getFullnam = require('../helper/getFullname')
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {type: DataTypes.STRING, validate: {
      isEmail: true}
    }
  })
  Student.prototype.getFullname = function () {
    return getFullnam(this.first_name,this.last_name);
  }
  Student.associate = function (model) {
    Student.hasMany(model.student_subject);
    Student.belongsToMany(model.Subjects,{through:'student_subject'})
  };
  return Student;
};
