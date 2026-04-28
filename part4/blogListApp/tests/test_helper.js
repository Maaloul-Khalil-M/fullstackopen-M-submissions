const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "First blog",
    author: "marj A",
    url: "http://example.com/1",
    likes: 6,
  },
  {
    title: "Second blog",
    author: "marj B",
    url: "http://example.com/2",
    likes: 7,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "todelete",
    author: "todelete",
    url: "http://todelete.tn",
    likes: 0,
  });
  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
