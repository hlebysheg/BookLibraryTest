export interface IBook{
    id: number
    name: string
    release: string
    author: string
    tag: ITag
}

export interface ITag {
    tagId: number
    tagName: string
}