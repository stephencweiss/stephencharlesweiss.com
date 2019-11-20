const dayjs = require('dayjs')
const BUILD_TIME = dayjs()

// Need to use module.exports because this is used in node, not just frontend
module.exports = {
  isPublished: node => {
    const { publish, date } = node.frontmatter
    if (process.env.nofilter) {
      return true
    }
    return BUILD_TIME.isAfter(publish ? dayjs(publish) : dayjs(date))
  },
}