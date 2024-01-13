export const getError = (obj, key) => {
  let status = false;
  let message = " ";
  Object.keys(obj).forEach((k) => {
    if (k === key) {
      status = true;
      message = obj[key]["message"];
    }
  });

  return { status, message };
};
