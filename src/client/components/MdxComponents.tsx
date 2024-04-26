import Link from 'next/link'
import Image, {ImageProps} from 'next/image'

const CustomLink = props => {
  const href = props.href
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return <Link href={href} {...props}></Link>
  }

  return <a rel="noopener" {...props} />
}

const MdxComponents = (slug: string) => ({
  Image: ({src, ...props}: ImageProps) => {
    return (
      <div className="-mx-4 md:-mx-8 text-center relative overflow-hidden flex sm:rounded-md">
        <Image src={src} {...props} />
      </div>
    )
  },
  Video: ({src, type = 'video/mp4', width}: {src: string; type?: string; width?: number}) => {
    return (
      <video className="w-full" width={width ?? ''}>
        <source src={src} type={type} />
      </video>
    )
  },
  a: CustomLink
})

export {MdxComponents}
