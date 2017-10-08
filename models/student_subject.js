'use strict';
module.exports = (sequelize, DataTypes) => {
  var student_subject = sequelize.define('student_subject', {
    // id: {type: DataTypes.INTEGER, primaryKey: true},
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    score: DataTypes.STRING
  })
  student_subject.associate = function (model) {
    student_subject.belongsTo(model.Subjects);
    student_subject.belongsTo(model.Student);
  }
  return student_subject;
};
