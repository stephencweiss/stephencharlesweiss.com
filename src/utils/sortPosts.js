import dayjs from 'dayjs';

export default function sortPosts(a, b, order = 'DESC') {
  const { listDate: aDate } = a.node.fields
  const { listDate: bDate } = b.node.fields
  if (!aDate || !bDate) {
      throw new Error(`sortPosts is broken! Check frontmatter for missing date fields!`)
  }

  if (order === 'ASC') {
    return dayjs(aDate).isAfter(dayjs(bDate)) ? 1 : -1
  } else if (order === 'DESC') {
    return dayjs(aDate).isAfter(dayjs(bDate)) ? -1 : 1
  }
}