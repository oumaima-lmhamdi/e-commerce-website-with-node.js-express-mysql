'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    googleId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    username: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'users',
    timestamps: false
  });
//   User.associate = function(models) {
//     // associations can be defined here
//   };
  return User;
};