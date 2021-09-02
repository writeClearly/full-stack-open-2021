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
      
    expect(response.body).toHaveLength(initialBlogs.length)
  }, 10000),
  test("properly adds blog by POST", async () => {
    const testBlog = 
    {
      "title": "Will i be added?",
      "author": "QA",
      "url": "/ootp/as",
      "likes": "15"
    }
    let newBlogPost = new blogPost(testBlog)
    await newBlogPost.save()
    const response = await api.get("/api/blogs")
    const allBlogs =  response.body

    // Warning!! 
    // as 02/09/2021 /dd/mm/yyyy
    // mongose blogPost model has implemented toJSON()., which stripes some properities out of model
    // thus if you want to compare newly added object, with Mongoose entries from REST GET,
    // you have to call toJSON() on newly added object to get exact form with database ones
    expect(allBlogs).toContainEqual(newBlogPost.toJSON())
    expect(allBlogs).toHaveLength(initialBlogs.length + 1)
  })
})
afterAll(() => {
  mongoose.connection.close()
})