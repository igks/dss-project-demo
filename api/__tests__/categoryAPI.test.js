const request = require("supertest");
const app = require("../app");
const { Category, sequelize } = require("../models");
const { categoryMock, categoryReqMock } = require("../__mocks__");

describe("Categories end point test suites", () => {
  describe("GET /category", () => {
    it("should return list of categories", async () => {
      jest.spyOn(Category, "findAll").mockImplementation(() => categoryMock);

      const res = await request(app).get("/category").send();
      expect(res.statusCode).toBe(200);
    });

    it("should return 500 for unhandled error", async () => {
      jest.spyOn(Category, "findAll").mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app).get("/category").send();
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res.text).message).toBe(
        "Server error processing the request!"
      );
    });
  });

  describe("GET /category/:id", () => {
    it("should return single category record", async () => {
      jest.spyOn(Category, "findByPk").mockImplementation(() => categoryMock);

      const res = await request(app).get("/category/1").send();
      expect(res.statusCode).toBe(200);
    });

    it("should return 404 if the record not exist", async () => {
      jest.spyOn(Category, "findByPk").mockImplementation(() => null);

      const res = await request(app).get("/category/2").send();
      expect(res.statusCode).toBe(404);
    });

    it("should return 500 for unhandled error", async () => {
      jest.spyOn(Category, "findByPk").mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app).get("/category/1").send();
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res.text).message).toBe(
        "Server error processing the request!"
      );
    });
  });

  describe("POST /category", () => {
    it("should create new category", async () => {
      jest.spyOn(Category, "create").mockImplementation(() => categoryMock);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());

      const res = await request(app).post("/category").send(categoryReqMock);
      expect(res.statusCode).toBe(200);
    });

    it("should return 400 if data validation failed", async () => {
      jest.spyOn(Category, "create").mockImplementation(() => categoryMock);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());

      const res = await request(app).post("/category").send({});
      expect(res.statusCode).toBe(400);
    });

    it("should return 500 for unhandled error", async () => {
      jest.spyOn(sequelize, "transaction").mockImplementation(() => {
        throw new Error("Server error");
      });
      jest.spyOn(Category, "create").mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app).post("/category").send(categoryReqMock);
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res.text).message).toBe(
        "Server error processing the request!"
      );
    });
  });

  describe("PUT /category/:id", () => {
    it("should update existing category", async () => {
      jest.spyOn(Category, "findByPk").mockImplementation(() => categoryMock);
      jest.spyOn(Category, "update").mockImplementation(() => categoryMock);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());

      const res = await request(app).put("/category/1").send(categoryReqMock);
      expect(res.statusCode).toBe(200);
    });

    it("should return 400 if data validation failed", async () => {
      jest.spyOn(Category, "findByPk").mockImplementation(() => categoryMock);
      jest.spyOn(Category, "update").mockImplementation(() => categoryMock);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());

      const res = await request(app).put("/category/1").send({});
      expect(res.statusCode).toBe(400);
    });

    it("should return 404 if record not exist", async () => {
      jest.spyOn(Category, "findByPk").mockImplementation(() => null);
      jest.spyOn(Category, "update").mockImplementation(() => categoryMock);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());

      const res = await request(app).put("/category/1").send(categoryReqMock);
      expect(res.statusCode).toBe(404);
    });

    it("should return 500 for unhandled error", async () => {
      jest.spyOn(Category, "findByPk").mockImplementation(() => categoryMock);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => {
        throw new Error("Server error");
      });
      jest.spyOn(Category, "update").mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app).put("/category/1").send(categoryReqMock);
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res.text).message).toBe(
        "Server error processing the request!"
      );
    });
  });

  describe("DELETE /category/:id", () => {
    it("should delete existing category", async () => {
      jest.spyOn(Category, "findByPk").mockImplementation(() => categoryMock);
      jest.spyOn(Category, "destroy").mockImplementation(() => categoryMock);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());

      const res = await request(app).delete("/category/1").send();
      expect(res.statusCode).toBe(200);
    });

    it("should return 404 if record not exist", async () => {
      jest.spyOn(Category, "findByPk").mockImplementation(() => null);
      jest.spyOn(Category, "destroy").mockImplementation(() => categoryMock);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => jest.fn());

      const res = await request(app).put("/category/1").send(categoryReqMock);
      expect(res.statusCode).toBe(404);
    });

    it("should return 500 for unhandled error", async () => {
      jest.spyOn(Category, "findByPk").mockImplementation(() => categoryMock);
      jest.spyOn(sequelize, "transaction").mockImplementation(() => {
        throw new Error("Server error");
      });
      jest.spyOn(Category, "destroy").mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app).put("/category/1").send(categoryReqMock);
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res.text).message).toBe(
        "Server error processing the request!"
      );
    });
  });
});
