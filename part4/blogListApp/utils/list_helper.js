const _ = require("lodash");

// always returns the value 1
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((maxBlog, currentBlog) =>
    currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog,
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  return _.chain(blogs)
    .groupBy("author") // {author, blogs[]}
    .map((blogs, author) => ({
      author: author,
      blogs: blogs.length,
    }))
    .maxBy("blogs")
    .value();
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  return _.chain(blogs)
    .groupBy("author") // {author, blogs[]}
    .map((blogs, author) => ({
      author: author,
      likes: _.sumBy(blogs, "likes"),
    }))
    .maxBy("likes")
    .value();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
