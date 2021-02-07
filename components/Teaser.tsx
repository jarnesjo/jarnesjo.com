import Link from 'next/link'
import Date from './date'

const Teaser = ({slug, title, date}) => {
  return (
    <article>
      <Link href={`/blog/${slug}`}>
        <a className="text-xl font-semibold">{title}</a>
      </Link>
      <br />
      <small>
        <Date dateString={date} />
      </small>
    </article>
  )
}

export {Teaser}
