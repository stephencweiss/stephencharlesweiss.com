const data = require('./data.js')

const byMonth = data.data.allMarkdownRemark.edges.reduce((acc, cur) => {
    const { publishMonth, publishYear } = cur.node.fields

    if (!acc[publishYear]) {
        acc[publishYear] = { [publishMonth]: [cur] }
    } else {
        if (!acc[publishYear][publishMonth]) {
            acc[publishYear][publishMonth] = [cur]
        } else {
            // console.log(acc[publishMonth][publishMonth])
            acc[publishYear][publishMonth].push(cur)
        }
    }

    // if (acc[cur.node.fields.publishMonth]) {
    //     acc[cur.node.fields.publishMonth] += 1
    // } else {
    //     acc[cur.node.fields.publishMonth] = 1
    // }
    return acc
}, {})

console.log(JSON.stringify(byMonth, null, 4))
