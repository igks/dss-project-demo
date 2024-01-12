const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { userMock } = require("../__mocks__");
const bcrypt = require("bcryptjs");

describe("User end point test suites", () => {
  describe("POST /register", () => {
    it("should register successfully", async () => {
      const mockCreate = jest.fn(() => userMock);
      jest.spyOn(User, "findOne").mockResolvedValue(null);
      jest.spyOn(User, "create").mockImplementation(() => mockCreate);

      const res = await request(app).post("/user/register").send({
        name: "user name",
        email: "user@mail.com",
        password: "12345678aB",
      });
      expect(res.statusCode).toBe(200);
    });

    it("should failed if user already exist", async () => {
      const mockCreate = jest.fn(() => userMock);
      jest.spyOn(User, "findOne").mockResolvedValue(userMock);
      jest.spyOn(User, "create").mockImplementation(() => mockCreate);

      const res = await request(app).post("/user/register").send({
        name: "user name",
        email: "user@mail.com",
        password: "12345678aB",
      });
      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text).message).toBe("Email already exist!.");
    });

    it("should failed if validation failed", async () => {
      const mockCreate = jest.fn(() => userMock);
      jest.spyOn(User, "findOne").mockResolvedValue(null);
      jest.spyOn(User, "create").mockImplementation(() => mockCreate);

      const res = await request(app).post("/user/register").send({
        email: "user@mail.com",
        password: "1234567",
      });
      expect(res.statusCode).toBe(400);
      expect(JSON.parse(res.text).message).toBe("Data validation failed!");
    });

    it("should return 500 for unhandled error", async () => {
      jest.spyOn(User, "findOne").mockImplementation(() => {
        throw new Error("Server error");
      });
      jest.spyOn(User, "create").mockImplementation(() => {
        throw new Error("Server error");
      });

      const res = await request(app).post("/user/register").send({});
      expect(res.statusCode).toBe(500);
      expect(JSON.parse(res.text).message).toBe(
        "Server error processing the request!"
      );
    });
  });

  describe("POST /login", () => {
    it("should login successfully", async () => {
      process.env = Object.assign(process.env, { JWT_KEY: "dummysecret" });
      jest.spyOn(bcrypt, "compareSync").mockImplementation(() => true);
      jest.spyOn(User, "findOne").mockResolvedValue({
        ...userMock,
        attempt: 0,
        lockUntil: null,
      });
      jest.spyOn(User, "update").mockImplementation(() => jest.fn());

      const res = await request(app).post("/user/login").send(userMock);
      expect(res.statusCode).toBe(200);
    });

    it("should failed if user not exist", async () => {
      process.env = Object.assign(process.env, { JWT_KEY: "dummysecret" });
      jest.spyOn(User, "findOne").mockResolvedValue(null);
      jest.spyOn(bcrypt, "compareSync").mockImplementation(() => true);
      jest.spyOn(User, "update").mockImplementation(() => jest.fn());

      const res = await request(app).post("/user/login").send(userMock);
      expect(res.statusCode).toBe(404);
      expect(JSON.parse(res.text).message).toBe("Record not found!");
    });

    it("should failed if credential invalid", async () => {
      process.env = Object.assign(process.env, { JWT_KEY: "dummysecret" });
      jest.spyOn(User, "findOne").mockResolvedValue({
        ...userMock,
        attempt: 0,
        lockUntil: null,
      });
      jest.spyOn(bcrypt, "compareSync").mockImplementation(() => false);
      jest.spyOn(User, "update").mockImplementation(() => jest.fn());

      const res = await request(app)
        .post("/user/login")
        .send({ ...userMock, password: "" });
      expect(res.statusCode).toBe(401);
      expect(JSON.parse(res.text).message).toBe(
        "Invalid given credential!, you have 2 more attempt."
      );
    });

    it("should locked after 3 time attempt", async () => {
      process.env = Object.assign(process.env, { JWT_KEY: "dummysecret" });
      jest.spyOn(User, "findOne").mockResolvedValue({
        ...userMock,
        attempt: 3,
        lockUntil: null,
      });
      jest.spyOn(bcrypt, "compareSync").mockImplementation(() => false);
      jest.spyOn(User, "update").mockImplementation(() => jest.fn());

      const res = await request(app)
        .post("/user/login")
        .send({ ...userMock, password: "" });
      expect(res.statusCode).toBe(401);
      expect(JSON.parse(res.text).message).toBe(
        "Your attempt is exceeded the limit, please try again after 30 minutes!"
      );
    });
  });
});
