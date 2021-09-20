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

  return <a rel="noopener" {...props} />
}

const MdxComponents = (slug: string) => ({
  Image: ({src, ...props}: ImageProps) => {
    const image = require(`../../posts/${slug}/${src}?lqip`)

    return (
      <div className="-mx-4 md:-mx-8 text-center relative overflow-hidden flex sm:rounded-md">
        {image.dataURI && (
          <img
            src={image.dataURI}
            className="absolute inset-0 w-full h-full transform scale-110 m-0"
            style={{filter: 'blur(20px)'}}
            aria-hidden="true"
            alt=""
          />
        )}
        <Image src={image?.src || image.default} {...props} />
      </div>
    )
  },
  Video: ({src, type = 'video/mp4', width}: {src: string; type?: string; width?: number}) => {
    const video = require(`../../posts/${slug}/${src}`)

    return (
      <video className="w-full" width={width ?? ''}>
        <source src={video.default} type={type} />
      </video>
    )
  },
  a: CustomLink
})

export {MdxComponents}
