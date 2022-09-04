export type PageNavigationProps = {
    previous: Node;
    next: Node;
}

export type Node = {
    frontmatter: {
        slug: string
        title: string
    }
}
