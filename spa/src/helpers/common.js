export const getError = (obj, key) => {
  let status = false;
  let message = " ";
  Object.keys(obj).map((k) => {
    if (k == key) {
      status = true;
      message = obj[key]["message"];
    }
  });

  return { status, message };
};
