"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasMany(models.StockIn, { foreignKey: "itemId" });
      Item.hasMany(models.StockOut, { foreignKey: "itemId" });
    }
  }
  Item.init(
    {
      name: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      category: DataTypes.ENUM(
        "Sembako",
        "Electronik",
        "MCK",
        "Mainan",
        "Others"
      ),
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
