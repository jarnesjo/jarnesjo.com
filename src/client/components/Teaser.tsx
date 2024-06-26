import Link from 'next/link'
import {PostDate} from '@/components/PostDate'

const Teaser = ({
  slug,
  title,
  date,
  category,
  size = 'normal'
}: {
  slug: string
  title: string
  date: string
  category?: string
  size?: 'normal' | 'large'
}) => {
  return (
    <article>
      <Link
        href={`/blog/${slug}`}
        className={`${size === 'large' ? 'text-2xl mb-1' : 'text-xl'} font-semibold block`}
      >
        <h2>{title}</h2>
      </Link>
      <span className="uppercase text-xs text-gray-500 font-medium tracking-widest">
        <PostDate dateString={date} /> {category && <>&bull; {category}</>}
      </span>
    </article>
  )
}

export {Teaser}
