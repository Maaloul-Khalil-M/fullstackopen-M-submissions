// npm test -- .\tests\blog_api.test.js
// npm run test:only -- ./tests/blog_api.test.js
const bcrypt = require("bcrypt");
const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);
let token;

const getToken = async () => {
  const res = await api
    .post("/api/login")
    .send({ username: "root", password: "password" });
  return res.body.token;
};

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("password", 10);
    const user = new User({
      username: "root",
      name: "Superuser",
      passwordHash,
    });
    await user.save();
    token = await getToken();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "myself",
      name: "Maaloul Khalil",
      password: "marjmarj",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "root",
      name: "root already exist",
      password: "password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails if password is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "invalidpwd",
      name: "invalidpwd",
      password: "12",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);

    assert(
      result.body.error.includes("password must be at least 3 characters long"),
    );
  });
});

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const initialBlogs = await helper.getInitialBlogs();
    await Blog.insertMany(initialBlogs);
  });

  //FIXED: Error: expected 200 "OK", got 401 "Unauthorized"
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  //FIXED: AssertionError [ERR_ASSERTION]: Expected values to be strictly equal: undefined !== 2
  test("all blogs are returned", async () => {
    const initialBlogs = await helper.getInitialBlogs();
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);
    assert.strictEqual(response.body.length, initialBlogs.length);
  });

  test("unique id prop of blog is named id", async () => {
    const blogs = await helper.blogsInDb();
    blogs.forEach((blog) => {
      assert.strictEqual(typeof blog.id, "string");
    });
  });

  //FIXED: Error: expected 201 "Created", got 401 "Unauthorized"
  describe("adding a new blog", () => {
    test("a valid blog can be added ", async () => {
      const newBlog = {
        title: "new blog",
        author: "marj N",
        url: "http://example.com/99",
        likes: 99,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map((n) => n.title);
      assert(titles.includes("new blog"));
    });

    test("a blog with missing likes will default to 0", async () => {
      const newBlog = {
        title: "no likes",
        author: "marj",
        url: "http://example.com/9",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const addedBlog = blogsAtEnd.find((b) => b.title === "no likes");
      assert.strictEqual(addedBlog.likes, 0);
    });

    test("an invalid blog can't be added", async () => {
      const invalidBlog = { title: "no url" };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(invalidBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
  });

  //FIXED: Error: expected 201 "Created", got 401 "Unauthorized"
  describe("delete a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
      const titles = blogsAtEnd.map((b) => b.title);
      assert(!titles.includes(blogToDelete.title));
    });
  });

  //FIXED: Error: expected 201 "Created", got 401 "Unauthorized"
  describe("updating a blog", () => {
    test("succeeds with valid data and returns updated blog", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      const updatedFields = { likes: blogToUpdate.likes + 100 };

      const result = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedFields)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(result.body.likes, blogToUpdate.likes + 100);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
