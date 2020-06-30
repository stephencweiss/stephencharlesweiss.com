/**
 * @argument {string} - sourceInstance is the "type" of file, e.g., a Blog, a List, etc. - it's set by the name property on the Gatsby Filesystem Plugin
 * @argument {string} - filepath is the location of the file, e.g., in the old content that was /<date>/<fileName>, it's now just /<fileName>
 * @returns {object} - an "oldSlug" and a "slug" -- the old is used for the redirect, the new is where the file should live
 * @example
 * * buildPaths("blog","/2020-01-01/fileName")
 * * returns {oldSlug: '/blog/2020-01-01/fileName', slug: 'fileName"}
 */
function buildPaths(sourceInstance, filePath) {
    const oldSlug =
        sourceInstance == 'notes' ? filePath : sourceInstance + filePath
    const pattern = /\w+\/[0-9]{4}-[0-9]{2}-[0-9]{2}\//gi
    const slug = oldSlug.replace(pattern, '')
    console.log(`build paths ->`, { sourceInstance, oldSlug, slug })
    return { oldSlug, slug }
}

module.exports = { buildPaths }
