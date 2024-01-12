function getErrors(obj) {
  return Object.keys(obj).map((key) => obj[key]["message"]);
}

module.exports = { getErrors };
