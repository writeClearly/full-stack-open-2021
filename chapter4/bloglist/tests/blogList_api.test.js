const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const blogPost = require("../models/blogpost")
const api = supertest(app)
const blogsUrl = "/api/blogs" 
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
describe("when api has initial notes", () => {
  test("it returns them in json", async () => {
    await api
      .get(blogsUrl)
      .expect(200)
      .expect("Content-Type", /application\/json/)
  }, 10000),
  test("it returns response with correct length", async () => {
    const response = await api
      .get(blogsUrl)
      
    expect(response.body).toHaveLength(initialBlogs.length)
  }, 10000),
  test("it adds blog by POST properly", async () => {
    const testBlog = 
    {
      "title": "Will i be added?",
      "author": "QA",
      "url": "/ootp/as",
      "likes": "15"
    }
    let newBlogPost = new blogPost(testBlog)
    await newBlogPost.save()
    const response = await api.get(blogsUrl)
    const allBlogs =  response.body

    // Warning!! 
    // as 02/09/2021 /dd/mm/yyyy
    // mongose blogPost model has implemented toJSON(), which stripes some properities out of model
    // thus if you want to compare newly added object, with Mongoose entries from REST GET,
    // you have to call toJSON() on newly added object to get exact form with database ones
    expect(allBlogs).toContainEqual(newBlogPost.toJSON())
    expect(allBlogs).toHaveLength(initialBlogs.length + 1)
  })
  test("it deletes note if id is correct", async () => {
    // Check existence of post, and then delete it with chcking result
    const response = await api.get(blogsUrl)
    const deleteID = response.body[0].id
    const searchedBlog = await blogPost.findById(deleteID)
    expect(response.body).toContainEqual(searchedBlog.toJSON())
    await blogPost.findByIdAndDelete(deleteID)
    const responseUpdated = await api.get(blogsUrl)
    expect(responseUpdated.body).not.toContainEqual(searchedBlog.toJSON())
  })
  test("it throws CastError if id is incorrect", async () => {
    const deleteID = "32434556789uhgcfghguioiytgd"
    try{
      blogPost.findByIdAndDelete(deleteID)
    }catch(error){
      expect(error.message).toBe("CastError")}
  }
  )
})
afterAll(() => {
  mongoose.connection.close()
})