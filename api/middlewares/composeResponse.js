function composeResponse() {
  return function (req, res, next) {
    res.Ok = (payload) => {
      res.status(200).json({
        ...payload,
        success: true,
      });
    };

    res.BadRequest = (payload) => {
      res.status(400).json({
        success: false,
        message: "Data validation failed!",
        ...payload,
      });
    };

    res.Unauthorized = (payload = {}) => {
      res.status(401).json({
        success: false,
        message: "Unauthorized user!",
        ...payload,
      });
    };

    res.NotFound = () => {
      res.status(404).json({
        success: false,
        message: "Record not found!",
      });
    };

    res.ServerError = () => {
      res.status(500).json({
        success: false,
        message: "Server error processing the request!",
      });
    };

    next();
  };
}

module.exports = composeResponse;
