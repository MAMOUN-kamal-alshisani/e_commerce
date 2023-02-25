const server = require("../../../index");
const request = require("supertest");
const app = request.agent(server)


describe("signup", () => {
  describe("signup successful", () => {
    it("should return 201", async () => {
      await app.post("/signup", {
            id:100,
          Username: "borzerdo",
          Email: "borz@yahoo.com",
          Password: "1234567",
        })
        .expect(201);
    });
  });
});



// describe("signin", () => {
//     describe("signin successful", () => {
//       it("should return 201", async () => {
//         await supertest(server)
//           .post("/signin", {
//             Email:"mamoun@yahoo.com",
//             Password:"1234567"
//           })
//           .expect(200);
//       });
//     });
//   });
// test("GET /api/posts", async () => {
//   const post = await User.create({ title: "Post 1", content: "Lorem ipsum" });

//   await supertest(app)
//     .get("/api/posts")
//     .expect(200)
//     .then((response) => {
//       // Check type and length
//       expect(Array.isArray(response.body)).toBeTruthy();
//       expect(response.body.length).toEqual(1);

//       // Check data
//       expect(response.body[0]._id).toBe(post.id);
//       expect(response.body[0].title).toBe(post.title);
//       expect(response.body[0].content).toBe(post.content);
//     });
// });
