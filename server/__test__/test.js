const request = require("supertest");
const { app } = require("../app");

describe("Test Describe", () => {
  test("Get /", async () => {
    try {
      let res = await request(app).get("/");
      console.log(res.body);
      expect(res.body.message).toBe("Hello World");
    } catch (error) {
      console.log(error);
    }
  });
});
