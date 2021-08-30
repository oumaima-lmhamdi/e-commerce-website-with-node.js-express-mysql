'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    category_name: DataTypes.STRING,
    subcategory_name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    freezeTableName: true,
    tableName: 'products',
    timestamps: false,
  });

  
  Product.associate = function(models) {
    // Product.belongsTo(models.Category, { through: 'ProjectCategory' })
    // Product.belongsTo(models.ProductCategory, { foreignKey: 'product_id', targetKey: 'product_id' })
    // Product.belongsTo(models.Basket, { foreignKey: 'product_id', targetKey: 'product_id' });
  };
  return Product;
};