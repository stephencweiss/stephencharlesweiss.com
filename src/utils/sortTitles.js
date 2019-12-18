export default function sortTitles(a, b, order = 'ASC') {
  const { title: aTitle } = a.node.frontmatter
  const { title: bTitle } = b.node.frontmatter

  if (!aTitle || !bTitle)
    throw new Error(
      `sortTitles is broken! Make sure frontmatter includes a title ${JSON.stringify(
        { a, b },
        null,
        4
      )}`
    )

  if (order === 'ASC') {
    return aTitle < bTitle ? -1 : 1
  } else if (order === 'DESC') {
    return aTitle < bTitle ? 1 : -1
  }
}
