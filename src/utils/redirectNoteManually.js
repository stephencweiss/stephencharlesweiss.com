function redirectNoteManually({
    fromPath,
    toPath,
    createPage,
    createRedirect,
    template,
}) {
    createPage({
        path: fromPath,
        component: template,
        context: {
            slug: toPath,
            previous: null,
            next: null,
        },
    })
    createRedirect({
        fromPath: fromPath,
        toPath: toPath,
        isPermanent: true,
        redirectInBrowser: true,
        statusCode: 301,
    })
}

module.exports = { redirectNoteManually }
