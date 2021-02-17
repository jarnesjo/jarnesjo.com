export type FrontMatterType = {
  title: string
  date: string
  description?: string
  category: string
  tags?: string[]
  author?: string
  image?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
}
