const dateFns = require('./dateFns')
const getBlurb = require('./getBlurb')
const sortPosts = require('./sortPosts')
module.exports = {...dateFns, ...getBlurb, ...sortPosts}