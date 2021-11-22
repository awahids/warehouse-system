const { Item } = require("../models");
const Joi = require("joi");
const { Op } = require("sequelize");

module.exports = {
  addItem: async (req, res) => {
    const { name, stock, price, category } = req.body;
    const body = req.body;

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
            message: "Items Cannot Found",
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
            message: "Items Cannot Found",
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
            message: "Items Cannot Found",
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
            message: "Items Cannot Found",
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
            message: "Items Cannot Found",
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

  showItemById: async (req, res) => {
    const id = req.params.id;

    try {
      const findItemById = await Item.findOne({
        where: { id: id },
      });

      if (!findItemById) {
        return res.status(400).json({
          status: "Failed",
          message: `id ${id} not found`,
        });
      }

      return res.status(200).json({
        status: "Success",
        message: "Success retrieved data",
        data: findItemById,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "internal server error",
      });
    }
  },

  updateItemById: async (req, res) => {
    const { name, stock, price, category } = req.body;
    const id = req.params.id;

    try {
      const updateItemById = await Item.update(
        {
          name: name,
          stock: stock,
          price: price,
          category: category,
        },
        {
          where: { id: id },
        }
      );

      if (!updateItemById[0]) {
        return res.status(400).json({
          status: "Failed",
          message: "Items cannot found",
        });
      }

      const findByOne = await Item.findOne({
        where: { id: id },
      });

      if (!findByOne) {
        return res.status(400).json({
          status: "Failed",
          message: "Items cannot found",
        });
      }

      return res.status(200).json({
        status: "Success",
        message: "Success updated data",
        data: findByOne,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "internal server error",
      });
    }
  },

  deleteItemById: async (req, res) => {
    const id = req.params.id;

    try {
      const deleteItemById = await Item.destroy({
        where: { id: id },
      });

      if (!deleteItemById) {
        return res.status(400).json({
          status: "Failed",
          message: `cannot delete item with id ${id}`,
        });
      }

      return res.status(200).json({
        status: "Success",
        message: "Success deleted item",
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "internal server error",
      });
    }
  },

  showItemsByCategory: async (req, res) => {
    const category = req.params.category;

    try {
      const findItemsByCategory = await Item.findAll({
        where: { category: category },
      });

      if (!findItemsByCategory) {
        return res.status(400).json({
          status: "Failed",
          message: `Cannot found category ${category}`,
        });
      }

      return res.status(200).json({
        status: "Success",
        message: "Success retrieved data",
        data: findItemsByCategory,
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
      return res.status(500).json({
        status: "failed",
        message: "internal server error",
      });
    }
  },

  searchingItems: async (req, res) => {
    const search = req.query.search ? req.query.search : "";

    try {
      const findItems = await Item.findAll({
        where: {
          name: { [Op.iLike]: "%" + search + "%" },
        },
      });

      if (!findItems && findItems.length == 0) {
        return res.status(400).json({
          status: "Failed",
          message: "No name match witch your input",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "success retrieved data",
        data: findItems,
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "internal server error",
      });
    }
  },
};
