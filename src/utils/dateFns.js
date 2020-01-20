const dayjs = require('dayjs')
const { BUILD_TIME, FAKE_START } = require('../constants')

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

const reducerToMostRecentDateBeforeBuild = (accumulator, curVal) =>
  curVal &&
  dayjs(curVal).isAfter(dayjs(accumulator)) &&
  (BUILD_TIME.isAfter(curVal) || BUILD_TIME.isSame(curVal, 'day'))
    ? curVal
    : accumulator

function listDate(node) {
  const { updated, publish, date } = node.frontmatter
  const allDates = []
  if (updated) allDates.push(...updated)
  allDates.push(publish, date)
  const filteredDates = allDates.filter(day => day)

  const maxDate = filteredDates
    .map(day => dayjs(day))
    .reduce(reducerToMostRecentDateBeforeBuild, FAKE_START)

    return maxDate && maxDate.isAfter(FAKE_START) ? maxDate : null
}

// Need to use module.exports because this is used in node, not just frontend
module.exports = {
  isPublished,
  listDate,
  publishDate,
  publishMonth,
  publishYear,
}
