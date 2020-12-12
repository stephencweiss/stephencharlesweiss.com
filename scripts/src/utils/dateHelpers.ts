const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

function formatDt(date: string, format?: string) {
    return dayjs(date).utc().format(format)
}

function isValidDt(date: string) {
    return date && dayjs(date).isValid()
}

module.exports = { formatDt, isValidDt }
