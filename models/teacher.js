'use strict';
let getFullname = require('../helper/getFullname')
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {type: DataTypes.STRING, validate: {
      isEmail: true}
    },
    SubjectId: DataTypes.INTEGER
  })
  Teacher.associate = function (model) {
    Teacher.belongsTo(model.Subjects)
  }
  Teacher.prototype.getFullname = function () {
    return getFullname(this.first_name,this.last_name)
  }
  return Teacher;
};
