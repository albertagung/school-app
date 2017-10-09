'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    secret: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    hooks: {
      beforeCreate: function(userPass){
        let crypto = require('crypto');
        let len = 8
        let result = ''
        let char = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for(let i = 0; i < len; i++){
          result += char.charAt(Math.floor(Math.random() * char.length));
        }
        let secret = result;
        let hash = crypto.createHmac('sha256', secret).update(userPass.password).digest('hex');
        userPass.secret = result
        userPass.password = hash
      }
    }
  });
  return user;
};
