'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    user_id: DataTypes.INTEGER,
    delivery_location_id: DataTypes.INTEGER,
    total_amount: DataTypes.DECIMAL,
    created_at: DataTypes.DATE,
    status: DataTypes.INTEGER,
    reference: DataTypes.STRING,
  }, {
    freezeTableName: true,
    tableName: 'orders',
    timestamps: false
  });
  // Order.associate = function(models) {
  //   // associations can be defined here
  // };
  return Order;
};