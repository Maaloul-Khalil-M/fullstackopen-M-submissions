// npm test -- .\tests\blog_api.test.js
// npm run test:only -- ./tests/blog_api.test.js
const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("unique id prop of blog is named id", async () => {
  const blogs = await helper.blogsInDb();
  blogs.forEach((blog) => {
    assert.strictEqual(typeof blog.id, "string");
  });
});

test.only("a valid blog can be added ", async () => {
  const newBlog = {
    title: "new blog",
    author: "marj N",
    url: "http://example.com/99",
    likes: 99,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((n) => n.title);
  assert(titles.includes("new blog"));
});

after(async () => {
  await mongoose.connection.close();
});
