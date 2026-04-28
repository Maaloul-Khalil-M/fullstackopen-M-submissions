// always returns the value 1
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

module.exports = {
  dummy,
  totalLikes,
};
