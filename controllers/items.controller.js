const { Item } = require("../models");
const Joi = require("joi");
const { Op } = require("sequelize");

module.exports = {
  addItems: async (req, res) => {
    const { name, stock, price, category } = req.body;

    try {
      const Schema = Joi.object({
        name: Joi.string().required(),
        stock: Joi.number().required(),
        price: Joi.number().required(),
        category: Joi.string().required(),
      });

      const { error } = Schema.validate({ ...body }, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          status: "Failed",
          message: "Bad Request",
          errors: error["details"].map(({ message }) => message),
        });
      }

      const findItem = await Item.findOne({
        where: { name: name },
      });

      if (findItem) {
        return res.status(400).json({
          status: "Failed",
          message: `Item ${name} already exists`,
        });
      }

      const addItem = await Item.create({
        name: name,
        stock: stock,
        price: price,
        category: category,
      });

      if (!addItem) {
        return res.status(400).json({
          status: "Failed",
          message: "Cannot add item",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "success created item",
        data: addItem,
      });
    } catch (error) {
      if (
        error.name === "SequelizeDatabaseError" &&
        error.parent.routine === "enum_in"
      ) {
        return res.status(400).json({
          status: "failed",
          message:
            "Sembako, Electronik, MCK, Mainan, Others only for Category Data Item",
        });
      }
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: "internal server error",
      });
    }
  },

  showListItems: async (req, res) => {
    const field = req.query.field;
    const sort = req.query.sort;

    try {
      if (field == "stock" && sort == "high") {
        const findMostStock = await Item.findAll({
          order: ["stock", "DESC"],
        });

        if (!findMostStock) {
          return res.status(400).json({
            status: "Failed",
            message: "Item Cannot Found",
          });
        }

        return res.status(200).json({
          status: "Success",
          message: "Success retrieved data items",
          data: findMostStock,
        });
      } else if (field == "stock" && sort == "low") {
        const findLowStock = await Item.findAll({
          order: ["stock", "ASC"],
        });

        if (!findLowStock) {
          return res.status(400).json({
            status: "Failed",
            message: "Item Cannot Found",
          });
        }

        return res.status(200).json({
          status: "Success",
          message: "Success retrieved data items",
          data: findLowStock,
        });
      } else if (field == "price" && sort == "high") {
        const findHighPrice = await Item.findAll({
          order: ["price", DESC],
        });

        if (!findHighPrice) {
          return res.status(400).json({
            status: "Failed",
            message: "Item Cannot Found",
          });
        }

        return res.status(200).json({
          status: "Success",
          message: "Success retrieved data items",
          data: findHighPrice,
        });
      } else if (field == "price" && sort == "low") {
        const findLowPrice = await Item.findAll({
          order: ["price", DESC],
        });

        if (!findLowPrice) {
          return res.status(400).json({
            status: "Failed",
            message: "Item Cannot Found",
          });
        }

        return res.status(200).json({
          status: "Success",
          message: "Success retrieved data items",
          data: findLowPrice,
        });
      } else {
        const findItems = await Item.findAll();
        if (!findItems) {
          return res.status(400).json({
            status: "failed",
            message: "cannot find item",
          });
        }

        return res.status(200).json({
          status: "success",
          message: "success retrieved data",
          data: findItems,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "internal server error",
      });
    }
  },
};
