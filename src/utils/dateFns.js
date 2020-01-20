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

function publishMonth(node) {
  return dayjs(publishDate(node))
    .set('date', 1)
    .format('YYYY-MM-DD')
}

function publishYear(node) {
  return dayjs(publishDate(node))
    .set('date', 1)
    .set('month', 1)
    .format('YYYY-MM-DD')
}

const reducerToMostRecentDateBeforeBuild = (accumulator, curVal) => {
  return curVal && dayjs(curVal).isAfter(dayjs(accumulator)) && BUILD_TIME.isAfter(curVal)
    ? curVal
    : accumulator
}

function listDate(node) {
  const { updated, publish, date } = node.frontmatter
  const allDates = [...updated, publish, date].filter(val => val)
  const listDate = allDates.reduce(reducerToMostRecentDateBeforeBuild)

  if (listDate) return listDate
  return publishDate(node)
}

// Need to use module.exports because this is used in node, not just frontend
module.exports = {
  isPublished,
  listDate,
  publishDate,
  publishMonth,
  publishYear,
}
