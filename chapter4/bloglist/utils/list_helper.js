const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const reducer = (accumulator, currentLikes) => accumulator + currentLikes.likes
  return blogs.reduce(reducer, 0)
}
module.exports = {
  dummy,
  totalLikes
}