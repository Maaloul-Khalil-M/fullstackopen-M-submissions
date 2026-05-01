const Blog = require("../models/blog");
const User = require("../models/user");

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

//add userId at correct place
const getInitialBlogs = async () => {
  const user = await User.findOne({ username: "root" });
  return initialBlogs.map((blogs) => ({ ...blogs, user: user._id }));
};

const nonExistingId = async () => {
  const user = await User.findOne({ username: "root" });
  const blog = new Blog({
    title: "todelete",
    author: "todelete",
    url: "http://todelete.tn",
    likes: 0,
    user: user._id,
  });
  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  getInitialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
