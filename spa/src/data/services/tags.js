export const tags = {
  categories: "categories",
  category: "category",
  products: "products",
  product: "product",
};

export const getTags = () => {
  const tagsList = Object.keys(tags).map((key) => tags[key]);
  return tagsList;
};
