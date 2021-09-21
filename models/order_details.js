'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('OrderDetails', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    freezeTableName: true,
    tableName: 'orders_history',
    timestamps: false
  });
  // OrderHistory.associate = function(models) {
  //   // associations can be defined here
  // };
  return Order;
};