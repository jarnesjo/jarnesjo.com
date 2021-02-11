import Link from 'next/link'
import Image, {ImageProps} from 'next/image'

const CustomLink = props => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props} />
      </Link>
    )
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const MdxComponents = (slug: string) => ({
  Image: ({src, ...props}: ImageProps) => {
    const image = require(`../posts/${slug}/${src}`)

    return (
      <div className="-mx-4 md:-mx-8 text-center relative overflow-hidden flex">
        {image.preSrc && (
          <img
            src={image.preSrc}
            className="w-full h-full absolute inset-0 mx-0 img-placeholder"
            aria-hidden="true"
            alt=""
          />
        )}
        <Image src={image?.src || image.default} {...props} />
      </div>
    )
  },
  a: CustomLink
})

export {MdxComponents}
