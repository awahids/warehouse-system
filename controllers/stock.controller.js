const { Item, StockIn, StockOut } = require("../models");

module.exports = {
  addStockIn: async (req, res) => {
    const id = req.params.id;
    const { stock } = req.body;

    try {
      const findItem = await Item.findOne({
        where: { id: id },
      });

      if (!findItem) {
        return res.status(400).json({
          status: "Failed",
          message: "Item cannot found",
        });
      }

      const addStockIn = await StockIn.create({
        itemId: id,
        stock: stock,
      });

      if (!addStockIn) {
        return res.status(400).json({
          status: "Failed",
          message: "Cannot add stock",
        });
      }

      let quantityStock = findItem.stock + stock;
      const updateStock = await Item.update(
        {
          stock: quantityStock,
        },
        {
          where: { id: id },
        }
      );

      return res.status(200).json({
        status: "success",
        message: "success insert a stock",
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "internal server error",
      });
    }
  },

  addStockOut: async (req, res) => {
    const findItem = await Item.findOne({
      where: { id: id },
    });

    if (!findItem) {
      return res.status(400).json({
        status: "Failed",
        message: "Item cannot found",
      });
    }

    const addStockIn = await StockOut.create({
      itemId: id,
      stock: stock,
    });

    if (!addStockIn) {
      return res.status(400).json({
        status: "Failed",
        message: "Cannot add stock",
      });
    }

    let quantityStock = findItem.stock - stock;
    const updateStock = await Item.update(
      {
        stock: quantityStock,
      },
      {
        where: { id: id },
      }
    );

    return res.status(200).json({
      status: "success",
      message: "success insert a stock",
    });
  },
};
