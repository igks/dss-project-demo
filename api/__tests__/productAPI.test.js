const request = require("supertest");
const app = require("../app");
const { Product, sequelize, CategoryProduct, Category } = require("../models");
const {
  productMock,
  productReqMock,
  categoryProductMock,
  categoryMock,
} = require("../__mocks__");

describe("Product end point test suites", () => {
  describe("GET /product", () => {
    it("should return list of product", async () => {
      jest.spyOn(Product, "findAll").mockImplementation(() => productMock);

      const res = await request(app).get("/product").send();
      expect(res.statusCode).toBe(200);
    });

    it("should return 500 for unhandled error", async () => {
      jest.spyOn(Product, "findAll").mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app).get("/product").send();
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res.text).message).toBe(
        "Server error processing the request!"
      );
    });
  });

  describe("GET /product/:id", () => {
    it("should return single product record", async () => {
      jest.spyOn(Product, "findByPk").mockImplementation(() => productMock);

      const res = await request(app).get("/product/1").send();
      expect(res.statusCode).toBe(200);
    });

    it("should return 404 if the record not exist", async () => {
      jest.spyOn(Product, "findByPk").mockImplementation(() => null);

      const res = await request(app).get("/product/2").send();
      expect(res.statusCode).toBe(404);
    });

    it("should return 500 for unhandled error", async () => {
      jest.spyOn(Product, "findByPk").mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app).get("/product/1").send();
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res.text).message).toBe(
        "Server error processing the request!"
      );
    });
  });

  describe("POST /product", () => {
    it("should create new product", async () => {
      jest.spyOn(Product, "create").mockImplementation(() => productMock);
      jest.spyOn(Category, "findAll").mockImplementation(() => [categoryMock]);
      jest
        .spyOn(CategoryProduct, "bulkCreate")
        .mockImplementation(() => categoryProductMock);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());

      const res = await request(app).post("/product").send(productReqMock);
      expect(res.statusCode).toBe(200);
    });

    it("should return 400 if data validation failed", async () => {
      jest.spyOn(Product, "create").mockImplementation(() => productMock);
      jest.spyOn(Category, "findAll").mockImplementation(() => [categoryMock]);
      jest
        .spyOn(CategoryProduct, "bulkCreate")
        .mockImplementation(() => categoryProductMock);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());

      const res = await request(app)
        .post("/product")
        .send({ categories: ["a"] });
      expect(res.statusCode).toBe(400);
    });

    it("should return 500 for unhandled error", async () => {
      jest.spyOn(sequelize, "transaction").mockImplementation(() => {
        throw new Error("Server error");
      });
      jest.spyOn(Product, "create").mockImplementation(() => {
        throw new Error("Server error");
      });
      jest.spyOn(CategoryProduct, "bulkCreate").mockImplementation(() => {
        throw new Error("Server error");
      });
      jest.spyOn(Category, "findAll").mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app).post("/product").send(productMock);
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res.text).message).toBe(
        "Server error processing the request!"
      );
    });
  });

  describe("PUT /product/:id", () => {
    it("should update existing product", async () => {
      jest.spyOn(Product, "findByPk").mockImplementation(() => productMock);
      jest.spyOn(Product, "update").mockImplementation(() => productMock);
      jest.spyOn(Category, "findAll").mockImplementation(() => [categoryMock]);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());
      jest
        .spyOn(CategoryProduct, "bulkCreate")
        .mockImplementation(() => categoryProductMock);

      const res = await request(app).put("/product/1").send(productReqMock);
      expect(res.statusCode).toBe(200);
    });

    it("should return 400 if data validation failed", async () => {
      jest.spyOn(Product, "findByPk").mockImplementation(() => productMock);
      jest.spyOn(Product, "update").mockImplementation(() => productMock);
      jest.spyOn(Category, "findAll").mockImplementation(() => [categoryMock]);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());
      jest
        .spyOn(CategoryProduct, "bulkCreate")
        .mockImplementation(() => categoryProductMock);

      const res = await request(app).put("/product/1").send();
      expect(res.statusCode).toBe(400);
    });

    it("should return 404 if record not exist", async () => {
      jest.spyOn(Product, "findByPk").mockImplementation(() => null);
      jest.spyOn(Product, "update").mockImplementation(() => productMock);
      jest.spyOn(Category, "findAll").mockImplementation(() => [categoryMock]);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());
      jest
        .spyOn(CategoryProduct, "bulkCreate")
        .mockImplementation(() => categoryProductMock);

      const res = await request(app).put("/product/1").send(productReqMock);
      expect(res.statusCode).toBe(404);
    });

    it("should return 500 for unhandled error", async () => {
      jest.spyOn(Product, "findByPk").mockImplementation(() => {
        throw new Error("Server error");
      });
      jest.spyOn(Product, "update").mockImplementation(() => {
        throw new Error("Server error");
      });
      jest.spyOn(Category, "findAll").mockImplementation(() => [categoryMock]);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());
      jest
        .spyOn(CategoryProduct, "bulkCreate")
        .mockImplementation(() => categoryProductMock);

      const res = await request(app).put("/product/1").send(productReqMock);
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res.text).message).toBe(
        "Server error processing the request!"
      );
    });
  });

  describe("DELETE /product/:id", () => {
    it("should delete existing product", async () => {
      jest.spyOn(Product, "findByPk").mockImplementation(() => productMock);
      jest.spyOn(Product, "destroy").mockImplementation(() => productMock);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());
      jest
        .spyOn(CategoryProduct, "destroy")
        .mockImplementation(() => categoryProductMock);

      const res = await request(app).delete("/product/1").send();
      expect(res.statusCode).toBe(200);
    });

    it("should return 404 if record not exist", async () => {
      jest.spyOn(Product, "findByPk").mockImplementation(() => null);
      jest.spyOn(Product, "destroy").mockImplementation(() => productMock);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());
      jest
        .spyOn(CategoryProduct, "destroy")
        .mockImplementation(() => categoryProductMock);

      const res = await request(app).delete("/product/1").send();
      expect(res.statusCode).toBe(404);
    });

    it("should return 500 for unhandled error", async () => {
      jest.spyOn(Product, "findByPk").mockImplementation(() => {
        throw new Error("Server error");
      });
      jest.spyOn(Product, "update").mockImplementation(() => {
        throw new Error("Server error");
      });
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());
      jest
        .spyOn(CategoryProduct, "destroy")
        .mockImplementation(() => categoryProductMock);

      const res = await request(app).delete("/product/1").send();
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res.text).message).toBe(
        "Server error processing the request!"
      );
    });
  });
});
