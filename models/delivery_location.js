'use strict';
module.exports = (sequelize, DataTypes) => {
  const DeliveryLocation = sequelize.define('DeliveryLocation', {
    delivery_location_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    adress: DataTypes.STRING,
    city: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'delivery_locations',
    timestamps: false
  });
  // DeliveryLocation.associate = function(models) {
  //   // associations can be defined here
  // };
  return DeliveryLocation;
};