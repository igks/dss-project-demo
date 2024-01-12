const Validator = require("fastest-validator");

const categorySchema = {
  name: {
    type: "string",
    optional: false,
  },
};

const v = new Validator();
const validateCategory = v.compile(categorySchema);

module.exports = { validateCategory };
