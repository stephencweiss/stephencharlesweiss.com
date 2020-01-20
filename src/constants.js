const dayjs = require(`dayjs`)

const ENTRIES_PER_PAGE = 6
const BUILD_TIME = dayjs()
const FAKE_TIME = dayjs('1900-01-01')

module.exports = { BUILD_TIME, ENTRIES_PER_PAGE, FAKE_TIME }
