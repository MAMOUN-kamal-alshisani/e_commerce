const server = require("../index");
const request = require("supertest");






describe("GET / , get the main route", () => {
    it("return status 200", async () => {
     request(server).get("/").expect(200).expect('<h2>Home Route</h2>')
    });
    // it("return status 404", async () => {
    //   await request(server).get("*").expect(404);
    // });
  });