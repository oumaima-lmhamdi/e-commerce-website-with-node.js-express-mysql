'use strict';
module.exports = (sequelize, DataTypes) => {
  const Basket = sequelize.define('Basket', {
    basket_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'baskets',
    timestamps: false
  });
  Basket.associate = function(models) {
    // associations can be defined here
    // Basket.hasMany(models.Product, { foreignKey: 'product_id', targetKey: 'product_id' })
  };
  return Basket;
};