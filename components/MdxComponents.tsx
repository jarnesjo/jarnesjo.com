import {TestComponent} from '@/components/TestComponent'
import Link from 'next/link'
import Image, {ImageProps} from 'next/image'
// import Img from 'react-optimized-image'

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

const MdxComponents = slug => ({
  Image: ({src, ...props}: ImageProps) => {
    return (
      <div className="-mx-4 md:-mx-8">
        <Image src={require(`../posts/${slug}/${src}`).default} {...props} />
      </div>
    )
  },
  a: CustomLink,
  TestComponent
})

export {MdxComponents}
