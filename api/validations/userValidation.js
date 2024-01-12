const Validator = require("fastest-validator");

const userSchema = {
  name: {
    type: "string",
    optional: false,
  },
  email: {
    type: "string",
    optional: false,
  },
  password: {
    type: "string",
    custom: (v, errors) => {
      if (!/[a-z]/.test(v)) errors.push({ type: "atLeastOneLowerCase" });
      if (!/[A-Z]/.test(v)) errors.push({ type: "atLeastOneUpperLetter" });
      if (!/[0-9]/.test(v)) errors.push({ type: "atLeastOneDigit" });
      return v;
    },
    min: 8,
    messages: {
      stringMin: "The password must be at least 8 characters length",
    },
  },
};

const v = new Validator({
  useNewCustomCheckerFunction: true,
  messages: {
    atLeastOneLowerCase:
      "The password must contain at least one lowercase letter!",
    atLeastOneUpperLetter:
      "The password must contain at least one uppercase letter!",
    atLeastOneDigit:
      "The password must contain at least one digit from 0 to 9!",
  },
});

const validateUser = v.compile(userSchema);

module.exports = { validateUser };
