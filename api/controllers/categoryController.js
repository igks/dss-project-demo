const { getErrors } = require("../helpers/common");
const { sequelize } = require("../models");
const { Category, CategoryProduct } = require("../models");
const { validateCategory } = require("../validations/categoryValidation");

async function getAll(req, res) {
  try {
    const categories = await Category.findAll();
    return res.Ok({ data: categories });
  } catch (error) {
    return res.ServerError();
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category == null) {
      return res.NotFound();
    }

    return res.Ok({
      data: category,
    });
  } catch (error) {
    return res.ServerError();
  }
}

async function create(req, res) {
  const categoryValidation = validateCategory(req.body);
  if (categoryValidation !== true) {
    const errors = getErrors(categoryValidation);
    return res.BadRequest({
      message: "Validation failed!",
      errors,
    });
  }

  try {
    const { name } = req.body;
    await sequelize.transaction(async (transaction) => {
      const category = await Category.create({ name }, { transaction });
      return category;
    });

    return res.Ok({
      message: "Category created successfully.",
    });
  } catch (error) {
    return res.ServerError();
  }
}

async function update(req, res) {
  const categoryValidation = validateCategory(req.body);
  if (categoryValidation !== true) {
    const errors = getErrors(categoryValidation);
    return res.BadRequest({
      message: "Validation failed!",
      errors,
    });
  }

  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findByPk(id);
    if (category == null) {
      return res.NotFound();
    }

    const updateCategory = {
      ...category,
      name,
    };

    await sequelize.transaction(async (transaction) => {
      return await Category.update(updateCategory, {
        where: { id },
        transaction,
      });
    });

    return res.Ok({
      message: "Category updated successfully.",
    });
  } catch (error) {
    return res.ServerError();
  }
}

async function remove(req, res) {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category == null) {
      return res.NotFound();
    }
    await sequelize.transaction(async (transaction) => {
      await Category.destroy({ where: { id }, transaction });
      await CategoryProduct.destroy({ where: { categoryId: id }, transaction });
      return;
    });

    return res.Ok({
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.ServerError();
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
