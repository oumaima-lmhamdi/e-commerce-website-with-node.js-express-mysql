'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    user_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    created_at: DataTypes.DATE,
  }, {
    freezeTableName: true,
    tableName: 'messages',
    timestamps: false
  });
//   Message.associate = function(models) {
//     // associations can be defined here
//   };
  return Message;
};