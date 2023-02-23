const server = require("../../../index");
const { db } = require("../../db/db");

const request = require("supertest");

describe("GET /users , get users", () => {
  it("return status 200", async () => {
    await request(server).get("/users").expect(200);
  });
  it("return status 404", async () => {
    await request(server).get("/use").expect(404);
  });
});

describe("GET /user/id , get one user", () => {
  it("return status 200", async () => {
    await request(server).get("/user/1").expect(200);
  });
  it("return status 404", async () => {
    await request(server).get("/user/no").expect(404);
  });
});

describe("POST /users , create an users", () => {
  
  it("users created successfully", async () => {
    const user = {
      id: 100,
     Username:"none",
     Email:"mamounNone@yahoo.com",
     Password:"123456789"
    };

    const response = await request(server).post("/users").send(user).expect(201);
  });

  it("return status 404", async () => {
    const user = {
      desc: "op 2022",
      price: "600",
      stock: " 2",
    };

    const response = await request(server).post("/item").send(user).expect(404);
  });
});

describe("PUT, /user/id , create an user", () => {
  it("user updated successfull, and returns status 201", async () => {
    const response = await request(server)
      .put("/user/100")
      .send({Username:"none_none" })
      .expect(201);
  });

  it("user not found to update , return status 404", async () => {
    const response = await request(server)
      .put("/user/1000")
      .send({ stock: 7 })
      .expect(404);
  });
});

describe("DELETE /user/id , create an item", () => {
  it("user deleted successfully and return status 201", async () => {
    const response = await request(server).delete("/user/100").expect(200);
  });
  it("user not found , return status 404", async () => {
    const response = await request(server).delete("/user/1000").expect(404);
  });
});

afterAll(async () => {
  // Closing the DB connection allows Jest to exit successfully.
  await db.close();
});
