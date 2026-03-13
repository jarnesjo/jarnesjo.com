import type {APIContext} from 'astro'
import {getCollection} from 'astro:content'
import {readFileSync} from 'fs'
import {join} from 'path'
import satori from 'satori'
import {Resvg} from '@resvg/resvg-js'

const fontData = readFileSync(join(process.cwd(), 'src/fonts/Inter-Bold.ttf'))

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({data}) => data.published !== false)
  return posts.map(post => ({
    params: {slug: post.data.slug},
    props: {title: post.data.title}
  }))
}

export async function GET({props}: APIContext) {
  const {title} = props as {title: string}

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '60px 80px',
          backgroundColor: '#1a1e2e',
          backgroundImage:
            'radial-gradient(ellipse at 20% 50%, rgba(100, 100, 140, 0.15) 0%, transparent 70%)',
          fontFamily: 'Inter'
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontSize: title.length > 60 ? 40 : title.length > 40 ? 48 : 56,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.3,
                maxWidth: '900px',
                marginBottom: '30px'
              },
              children: title
            }
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                fontSize: 20
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: {color: '#ef4444'},
                    children: '<'
                  }
                },
                {
                  type: 'span',
                  props: {
                    style: {color: '#9ca3af'},
                    children: 'jarnesjo.com/'
                  }
                },
                {
                  type: 'span',
                  props: {
                    style: {color: '#ef4444'},
                    children: '>'
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          weight: 700,
          style: 'normal'
        }
      ]
    }
  )

  const resvg = new Resvg(svg, {
    fitTo: {mode: 'width', value: 1200}
  })
  const png = resvg.render().asPng()

  return new Response(png, {
    headers: {'Content-Type': 'image/png'}
  })
}
