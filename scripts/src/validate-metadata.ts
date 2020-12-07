#!/usr/bin/env node

// import kebabCase from 'lodash.kebabcase'

// const matter = require('gray-matter')

const fs = require('fs')
const path = require('path')
const os = require('os')
// const { formatDt, isValidDt } = require('./utils/dateHelpers')
// const dayjs = require('dayjs')
// const utc = require('dayjs/plugin/utc')
// dayjs.extend(utc)

const HOME = os.homedir()
const PATH = path.join(HOME, 'code/digital-garden/notes')

// function formatDt(date: string, format?: string) {
//     return dayjs(date).utc().format(format)
// }

// function isValidDt(date: string) {
//     return date && dayjs(date).isValid()
// }

function findAllMdFiles() {
    const mdFilePaths: string[] = []
    const dirQueue = [PATH]

    while (dirQueue.length) {
        const dir = dirQueue.pop() ?? ''
        const dirContents = fs.readdirSync(dir)
        dirContents.forEach((el: string) => {
            const elPath = path.resolve(dir, el)
            const stat = fs.statSync(elPath)
            if (stat && stat.isDirectory()) {
                dirQueue.push(elPath)
            } else if (stat && path.extname(elPath) === '.md') {
                mdFilePaths.push(elPath)
            }
        })
    }
    return mdFilePaths
}

function validateFrontmatter() {
    const files = findAllMdFiles()
    console.log({ files })

    // files.forEach((file) => updateFrontmatter(file))
    console.log(`VALIDATION IS A WIP`)
}

// function updateFrontmatter(file: string) {
//     const { content, data, path } = matter.read(file)
//     const { publish, slug, title } = data
//     console.log({ title, slug })
//     if (publish && !slug) {
//         data.slug = kebabCase(title)
//         // fs.writeFile(
//         //     path,
//         //     `${generateFrontmatter(data)}${content}`,
//         //     (err: Error) => {
//         //         if (err) console.log({ err })
//         //     }
//         // )
//     }

//     // if (publish && !stage) {
//     //   data.stage = 'published';
//     // }
// }

// function generateFrontmatter(options: any) {
//     let frontmatter = ''
//     for (let [key, val] of Object.entries(options)) {
//         if (!val) {
//             frontmatter += `# ${key}: undefined`
//         } else if (key === 'private') {
//             frontmatter += `private: ${val}` // special handling due to Private being a restricted word in JS
//         } else if (key === 'date' || key === 'publish') {
//             if (!isValidDt(val as string))
//                 throw new Error(
//                     `Invalid date in ${options.title}\nBad date value: ${val}`
//                 )
//             frontmatter += `${key}: ${formatDt(val as string)}`
//         } else if (typeof val === 'string') {
//             frontmatter += `${key}: "${val}"`
//         } else if (Array.isArray(val)) {
//             frontmatter += `${key}: [${val.map((el) => `"${el}"`).join(', ')}]`
//         }

//         frontmatter += `\n`
//     }
//     return `---\n${frontmatter}---\n`
// }

validateFrontmatter()
