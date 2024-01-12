const { getErrors } = require("../helpers/common");
const { sequelize } = require("../models");
const { Product, CategoryProduct, Category } = require("../models");
const { validateProduct } = require("../validations/productValidation");

async function getAll(req, res) {
  try {
    const products = await Product.findAll();
    return res.Ok({ data: products });
  } catch (error) {
    return res.ServerError();
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, { include: [Category] });
    if (product == null) {
      return res.NotFound();
    }

    return res.Ok({
      data: product,
    });
  } catch (error) {
    return res.ServerError();
  }
}

async function create(req, res) {
  try {
    const productValidation = await validateProduct(req.body);
    if (productValidation !== true) {
      const errors = getErrors(productValidation);
      return res.BadRequest({
        message: "Validation failed!",
        errors,
      });
    }

    const { name, price, imageUrl, categories } = req.body;
    await sequelize.transaction(async (transaction) => {
      const product = await Product.create(
        { name, price, imageUrl },
        { transaction }
      );
      const categoryProduct = categories.map((category) => {
        return {
          ProductId: product.id,
          CategoryId: category,
        };
      });
      await CategoryProduct.bulkCreate(categoryProduct, { transaction });

      return product;
    });

    return res.Ok({
      message: "Product created successfully.",
    });
  } catch (error) {
    return res.ServerError();
  }
}

async function update(req, res) {
  const productValidation = await validateProduct(req.body);
  if (productValidation !== true) {
    const errors = getErrors(productValidation);
    return res.BadRequest({
      message: "Validation failed!",
      errors,
    });
  }

  const { id } = req.params;
  const { name, price, imageUrl, categories } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (product == null) {
      return res.NotFound();
    }

    const updateProduct = {
      ...product,
      name,
      price,
      imageUrl,
    };

    await sequelize.transaction(async (transaction) => {
      await Product.update(updateProduct, {
        where: { id },
        transaction,
      });
      await CategoryProduct.destroy({
        where: { productId: id },
        transaction,
      });
      const categoryProduct = categories.map((category) => {
        return {
          ProductId: id,
          CategoryId: category,
        };
      });
      await CategoryProduct.bulkCreate(categoryProduct, { transaction });
      return;
    });

    return res.Ok({
      message: "Product updated successfully.",
    });
  } catch (error) {
    return res.ServerError();
  }
}

async function remove(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product == null) {
      return res.NotFound();
    }
    await sequelize.transaction(async (t) => {
      await product.destroy({ where: { id }, transaction: t });
      await CategoryProduct.destroy({ where: { productId: id } });
      return;
    });

    return res.Ok({
      message: "Product deleted successfully",
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
