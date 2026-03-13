import rss from '@astrojs/rss'
import {getCollection} from 'astro:content'

export async function GET(context: {site: URL}) {
  const posts = (await getCollection('blog', ({data}) => data.published !== false))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

  return rss({
    title: 'Nicklas Jarnesjö',
    description: 'Web developer who loves building and learning new things',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: `<p>${post.data.description || ''}</p><p><a href="${context.site}blog/${post.data.slug}">Read full article →</a></p>`,
      link: `/blog/${post.data.slug}`,
      categories: [post.data.category, ...(post.data.tags || [])],
      author: post.data.author || 'Nicklas Jarnesjö'
    }))
  })
}
