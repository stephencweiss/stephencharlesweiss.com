const dateFns = require('./dateFns')
const sortPosts = require('./sortPosts')
const redirectNoteManually = require('./redirectNoteManually')

module.exports = { ...dateFns, ...sortPosts, ...redirectNoteManually }
