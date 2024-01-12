const userMock = {
  name: "User 1",
  email: "user1@mail.com",
  password: "12345678aB",
};

const categoryMock = {
  id: 1,
  name: "Category 1",
};

const categoryReqMock = {
  name: "category name",
};

const productMock = {
  id: 1,
  name: "product name",
  price: 1000,
  imageUrl: "image url mock",
  categories: [1, 2],
};

const productReqMock = {
  name: "product name",
  price: 1000,
  imageUrl: "image url mock",
  categories: [1],
};

const categoryProductMock = {
  id: 1,
  categoryId: 1,
  productId: 1,
};

module.exports = {
  userMock,
  categoryMock,
  categoryReqMock,
  productMock,
  productReqMock,
  categoryProductMock,
};
