import dayjs from 'dayjs';

export default function sortPosts(a, b, order = 'asc') {
  const { publish: aPublish, date: aDate } = a.node.frontmatter
  const { publish: bPublish, date: bDate } = b.node.frontmatter
  let aCompDate = aPublish ? aPublish : aDate
  let bCompDate = bPublish ? bPublish : bDate
  if (!aCompDate || !bCompDate) {
    console.error(`Check frontmatter!`)
    return -1
  }
  if (order === 'asc') {
    return dayjs(aCompDate).isAfter(dayjs(bCompDate)) ? -1 : 1
  } else if (order === 'desc') {
    return dayjs(aCompDate).isAfter(dayjs(bCompDate)) ? 1 : -1
  }
}