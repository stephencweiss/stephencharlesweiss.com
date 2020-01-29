/**
 * For more detail on how hashing functions like this work:
 * http://mediocredeveloper.com/wp/?p=55
 */
function hash(str) {
  let hash = 0
  if (str.length === 0) return
  for (let i = 0; i < str.length; i += 1) {
    let char = str.charCodeAt(i)
    hash = (hash << 5) + hash + char
    hash = hash & hash // Convert to 32bit integer
    hash = Math.abs(hash)
  }
  return hash
}

function boundedHash(str, max = 100) {
  let hashedVal = hash(str)
  return hashedVal % max
}

module.exports = { hash, boundedHash }
