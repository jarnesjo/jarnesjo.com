import {writeFileSync} from 'fs'
import RSS from 'rss'
import {getAllPostsData} from './_lib/posts.mjs'
;(async () => {
  const siteUrl = 'https://jarnesjo.com'

  const feed = new RSS({
    title: 'Nicklas Jarnesjö',
    description: 'Web developer who loves building and learning new things',
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`
  })

  const allPosts = getAllPostsData()

  allPosts.map(post => {
    feed.item({
      title: post.title,
      url: `${siteUrl}/${post.slug}`,
      date: post.date,
      description: post.description,
      categories: [post.category, ...post.tags],
      author: post.author
    })
  })

  writeFileSync('./public/feed.xml', feed.xml({indent: true}))
})()
