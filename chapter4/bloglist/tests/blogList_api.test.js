const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const blogPost = require("../models/blogpost")
const api = supertest(app)
/*
WARNING! This test runs on main database dropping its contents before each run
*/
const initialBlogs = [
  {
    "title": "First post",
    "author": "unknown",
    "url": "/afas/as",
    "likes": "2"
  },
  {
    "title": "Second post",
    "author": "Jaen",
    "url": "/ootp/as",
    "likes": "21"
  },
]

beforeEach(async () => {
  await blogPost.deleteMany({})
  let blogObj = new blogPost(initialBlogs[0])
  await blogObj.save()
  blogObj = new blogPost(initialBlogs[1])
  await blogObj.save()

})
describe("api test", () => {
  test("get return json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  }, 10000),
  test("returns response with correct length", async () => {
    const response = await api
      .get("/api/blogs")
      
    expect(response.body).toHaveLength(2)
  }, 10000)
  
})
afterAll(() => {
  mongoose.connection.close()
})