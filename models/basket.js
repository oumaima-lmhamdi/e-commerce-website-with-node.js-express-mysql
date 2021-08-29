'use strict';
module.exports = (sequelize, DataTypes) => {
  const Basket = sequelize.define('Basket', {
    basket_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'baskets',
    timestamps: false
  });
  // Basket.associate = function(models) {
  //   // associations can be defined here
  // };
  return Basket;
};