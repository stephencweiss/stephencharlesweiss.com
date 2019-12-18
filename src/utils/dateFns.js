const dayjs = require('dayjs')
const BUILD_TIME = dayjs()

function isPublished(node) {
  const { publish, date } = node.frontmatter
  if (process.env.nofilter) {
    return true
  }
  return BUILD_TIME.isAfter(publish ? dayjs(publish) : dayjs(date))
}

function publishDate(node) {
  const { publish, date } = node.frontmatter
  return publish ? publish : date
}

function listDate(node) {
    const { updated } = node.frontmatter
    if (updated && BUILD_TIME.isAfter(dayjs(updated))) return updated
    return publishDate(node)
}

// Need to use module.exports because this is used in node, not just frontend
module.exports = {
  isPublished,
  listDate,
  publishDate,
}
