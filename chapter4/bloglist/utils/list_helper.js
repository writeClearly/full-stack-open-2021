const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const reducer = (accumulator, currentLikes) => accumulator + currentLikes.likes
  return blogs.reduce(reducer, 0)
}
const favouriteBlog = (blogs) => {
  if(blogs.length > 0){
    const mostLiked = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return mostLiked
  }
  else
    return []
}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}