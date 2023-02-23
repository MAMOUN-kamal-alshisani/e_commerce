const server = require("../../../index");
const { db } = require("../../db/db");

const request = require("supertest");

describe("GET /item , get items", () => {
  it("return status 200", async () => {
    await request(server).get("/item").expect(200);
  });
  it("return status 404", async () => {
    await request(server).get("/item/ssa").expect(404);
  });
});

describe("GET /item/id , get one item", () => {
  it("return status 200", async () => {
    await request(server).get("/item/1").expect(200);
  });
  it("return status 404", async () => {
    await request(server).get("/item/no").expect(404);
  });
});

describe("POST /item , create an item", () => {
  
  it("item created successfully", async () => {
    const item = {
      id: 100,
      title: "Laptop",
      name: "15-inchs HP Pavilion",
      desc: "15-inchs HP Pavilion IPS FHD Intel 8-Core i5-1135G7 16GB Ram, 1TB SSD Laptop 2022",
      price: "600",
      stock: 2,
      img: [
        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6463/6463368ld.jpg",
        "https://i5.walmartimages.com/asr/ead24d0c-41e5-416c-8270-77bc6771a9ef.7b47e67d77b07ff7a7563293f7041e7e.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff",
        "https://d1eh9yux7w8iql.cloudfront.net/product_images/1588685049.3711443.jpg",
      ],
    };

    const response = await request(server).post("/item").send(item).expect(201);
    // .expect();
  });

  it("return status 404", async () => {
    const item = {
      desc: "op 2022",
      price: "600",
      stock: " 2",
    };

    const response = await request(server).post("/item").send(item).expect(404);
    console.log(response);
    // .expect();
  });
});

describe("PUT, /item/id , create an item", () => {
  it("item updated successfull, and returns status 201", async () => {
    const response = await request(server)
      .put("/item/100")
      .send({ stock: 20 })
      .expect(201);
  });

  it("item not found to update , return status 404", async () => {
    const response = await request(server)
      .put("/item/1000")
      .send({ stock: 7 })
      .expect(404);
  });
});

describe("DELETE /item/id , create an item", () => {
  it("item deleted successfully and return status 201", async () => {
    const response = await request(server).delete("/item/100").expect(200);
  });
  it("item not found , return status 404", async () => {
    const response = await request(server).delete("/item/1000").expect(404);
  });
});

afterAll(async () => {
  // Closing the DB connection allows Jest to exit successfully.
  await db.close();
});

// server.listen(5000, () => {
//   console.log("Server has started!");
// });
