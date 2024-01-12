const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const composeResponse = require("./middlewares/composeResponse");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");

const app = express();
app.use(bodyParser.json());
app.use(composeResponse());
app.use(cors());

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);

module.exports = app;
