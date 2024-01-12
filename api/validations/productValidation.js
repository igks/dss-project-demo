const Validator = require("fastest-validator");
const { Category } = require("../models");

function isValidCategoryId(ids, validCategories) {
  if (!Array.isArray(ids)) return false;
  for (id of ids) {
    if (isNaN(id) || !validCategories.includes(id)) return false;
  }
  return true;
}

const productSchema = {
  $$async: true,
  name: {
    type: "string",
    optional: false,
  },
  price: {
    type: "number",
    positive: true,
    optional: false,
  },
  imageUrl: {
    type: "string",
    optional: false,
  },
  categories: {
    type: "array",
    optional: false,
    custom: async (v, errors) => {
      const categories = await Category.findAll({ attributes: ["id"] });
      const categoryIds = categories.map(({ id }) => id);
      if (!isValidCategoryId(v, categoryIds))
        errors.push({ type: "validCategoryId" });
      return v;
    },
  },
};

const v = new Validator({
  useNewCustomCheckerFunction: true,
  messages: {
    validCategoryId: "The product must be include valid category id!",
  },
});
const validateProduct = v.compile(productSchema);

module.exports = { validateProduct };
