const server = require("../../../index");
const { db } = require("../../db/db");
const app = "http://localhost:2000/";
const request = require("supertest");

describe("GET /contact , get all contacts", () => {
  it("return status 200", async () => {
    await request(server).get("/contact").expect(200);
  });
  it("return status 404", async () => {
    await request(server).get("/contadct").expect(404);
  });
});

describe("GET /contact/id , get one contact ", () => {
  it("return status 200", async () => {
    await request(server).get("/contact/1").expect(200);
  });
  it("return status 404", async () => {
    await request(server).get("/contact/none").expect(404);
  });
});

describe("GET /contacted/UserId , get one contact based on user id", () => {
  it("return status 200", async () => {
    await request(server).get("/contacted/1").expect(200);
  });
  it("return status 404", async () => {
    await request(server).get("/contacted/none").expect(404);
  });
});

describe("POST /contact , create contact", () => {

  it("contact created successfully", async () => {
    const contact = {
      id: 101,
      fullName: "Mamoun kamal bursi",
      phone: "0777692155",
      birthDate: "1996-06-25",
      city: "zarqa",
      address: "As sukhnah/zarqa",
      // userId:2
    };

    const response = await request(server)
      .post("/contact/2")
      .send(contact)
      .expect(201);
    // .expect();
  });


  it("return status 404", async () => {
    const contact = ''
    const response = await request(server)
      .post("/contact/noe")
      .send(contact)
      .expect(404);
    // .expect();
  });
});

describe("PUT, /contact/UserId , update contact", () => {
  it("contact update successfull, and returns status 201", async () => {
    const response = await request(server)
      .put("/contact/2")
      .send({ fullName: 'no name available!' })
      .expect(201);
  });

  it("item not found to update , return status 404", async () => {
    const response = await request(server)
      .put("/contact/none")
      .send({ age: 7 })
      .expect(404);
  });
});

describe("DELETE /contact/id , create an contact", () => {
  it("contact deleted successfully and return status 201", async () => {
    const response = await request(server).delete("/contact/16").expect(200);
  });
  it("contact not found , return status 404", async () => {
    const response = await request(server).delete("/contact/none").expect(404);
  });
});

afterAll(async () => {
  // Closing the DB connection allows Jest to exit successfully.
  await db.close();
});

// server.listen(5000, () => {
//   console.log("Server has started!");
// });
