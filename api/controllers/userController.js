const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateUser } = require("../validations/userValidation");
const { getErrors } = require("../helpers/common");

async function register(req, res) {
  try {
    const existUser = await User.findOne({ where: { email: req.body.email } });
    if (existUser) {
      return res.BadRequest({
        message: "Email already exist!.",
      });
    }

    const userValidation = validateUser(req.body);
    if (userValidation !== true) {
      const errors = getErrors(userValidation);
      return res.BadRequest({
        errors,
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const securePassword = bcrypt.hashSync(req.body.password, salt);

    const payload = {
      ...req.body,
      password: securePassword,
      attempt: 0,
      lockUntil: new Date(
        new Date().getTime() - process.env.TIME_LOCK_DURATION * 60 * 1000
      ),
    };

    const user = await User.create(payload);
    return res.Ok({
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    return res.ServerError();
  }
}

async function login(req, res) {
  try {
    const ATTEMPT = 3;
    const currentTime = new Date();
    const nextValidTime = new Date(
      currentTime.getTime() + process.env.TIME_LOCK_DURATION * 60 * 1000
    );

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.NotFound();
    }

    if (user.lockUntil > currentTime) {
      return res.Unauthorized({
        message:
          "Your attempt is exceeded the limit, please try again after 30 minutes!",
      });
    }

    const isAuthenticated = bcrypt.compareSync(password, user.password);
    if (isAuthenticated) {
      if (user.attempt > 0) {
        await User.update(
          {
            ...user,
            attempt: 0,
          },
          { where: { email: req.body.email } }
        );
      }

      const token = jwt.sign(
        {
          email: user.email,
          userId: user.id,
        },
        process.env.JWT_KEY
      );
      return res.Ok({
        message: "Logged in successfully!",
        user,
        token,
      });
    }

    if (user.attempt < ATTEMPT) {
      await User.update(
        {
          ...user,
          attempt: user.attempt + 1,
        },
        { where: { email: req.body.email } }
      );
    }

    if (user.attempt + 1 >= ATTEMPT) {
      await User.update(
        {
          ...user,
          attempt: 0,
          lockUntil: nextValidTime,
        },
        { where: { email: req.body.email } }
      );
      return res.Unauthorized({
        message:
          "Your attempt is exceeded the limit, please try again after 30 minutes!",
      });
    }

    return res.Unauthorized({
      message: `Invalid given credential!, you have ${
        ATTEMPT - (user.attempt + 1)
      } more attempt.`,
    });
  } catch (error) {
    return res.ServerError();
  }
}

module.exports = { register, login };
