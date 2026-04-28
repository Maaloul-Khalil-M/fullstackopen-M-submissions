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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
