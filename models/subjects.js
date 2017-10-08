'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subjects = sequelize.define('Subjects', {
    subject_name: DataTypes.STRING
  })
  Subjects.associate = function (model) {
    Subjects.hasMany(model.Teacher);
    Subjects.hasMany(model.student_subject);
    Subjects.belongsToMany(model.Student,{through:'student_subject'})
  };
  return Subjects;
};
