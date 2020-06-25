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

function publishDay(node) {
    return dayjs(publishDate(node)).format('DD')
}

function publishMonth(node) {
    return dayjs(publishDate(node)).format('MM')
}

function publishMonthLong(node) {
    return dayjs(publishDate(node)).format('MMMM')
}

function publishYear(node) {
    return dayjs(publishDate(node)).format('YYYY')
}

function listDate(node) {
    return calculateListDate(node).format('YYYY-MM-DD')
}

function listDay(node) {
    return calculateListDate(node).format('DD')
}

function listMonth(node) {
    return calculateListDate(node).format('MM')
}

function listMonthLong(node) {
    return calculateListDate(node).format('MMMM')
}

function listYear(node) {
    return calculateListDate(node).format('YYYY')
}

function calculateListDate(node) {
    const { updated, publish, date } = node.frontmatter
    const allDates = []
    if (updated) allDates.push(...updated)
    allDates.push(publish, date)
    const filteredDates = allDates.filter((day) => day)

    const maxDate = filteredDates
        .map((day) => dayjs(day))
        .reduce(reducerToMostRecentDateBeforeBuild, FAKE_START)

    const returnedDate = maxDate && maxDate.isAfter(FAKE_START) ? maxDate : null
    return dayjs(returnedDate)
}

const reducerToMostRecentDateBeforeBuild = (accumulator, curVal) =>
    curVal &&
    dayjs(curVal).isAfter(dayjs(accumulator)) &&
    (BUILD_TIME.isAfter(curVal) || BUILD_TIME.isSame(curVal, 'day'))
        ? curVal
        : accumulator

// Need to use module.exports because this is used in node, not just frontend
module.exports = {
    isPublished,
    listDate,
    listDay,
    listMonth,
    listMonthLong,
    listYear,
    publishDate,
    publishDay,
    publishMonth,
    publishMonthLong,
    publishYear,
}
