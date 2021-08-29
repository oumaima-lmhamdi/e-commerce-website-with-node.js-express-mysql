'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
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