/**
 * @argument {string} - sourceInstance is the "type" of file, e.g., a Blog, a List, etc. - it's set by the name property on the Gatsby Filesystem Plugin
 * @argument {string} - filepath is the location of the file, e.g., in the old content that was /<date>/<fileName>, it's now just /<fileName>
 * @returns {object} - an "fromPath" and a "toPath" -- the old is used for the redirect, the new is where the file should live
 * @example
 * * defineRedirect("blog","/2020-01-01/fileName")
 * * returns {fromPath: '/blog/2020-01-01/fileName', toPath: 'fileName"}
 * * defineRedirect("list","/myList")
 * * returns {fromPath: '/list/myList', toPath: 'myList"}
 */
function defineRedirect(sourceInstance, filepath) {
    const fromPath = `/${sourceInstance + filepath}`
    const pattern = /\w+\/[0-9]{4}-[0-9]{2}-[0-9]{2}\//gi
    const toPath = fromPath.replace(pattern, '')
    return { fromPath, toPath }
}

module.exports = { defineRedirect }
