import React, { useState, useEffect } from 'react'
import Prismic from '@prismicio/client'
import {useCssHandles} from 'vtex.css-handles'

import { Home } from './pages/home'
import { Blog } from './pages/blog'
import { Post } from './pages/post'

interface BlogPrismicProps {
  numberPosts: number;
  blogLayout: string;
  query: {
    slug: string;
  };
}

interface PostInfo {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    banner: {
      url: string;
    };
    author: string;
    content: [];
  };
}

const CSS_HANDLES = [
  'container',
  'blog'
]

const apiEndpoint = 'https://my-blogignite.prismic.io/api/v2'
const accessToken = 'MC5ZVHo1ZlJBQUFDSUEyS1Q0.NH5w77-977-9fe-_vQjvv70677-977-9Re-_vVZrcVLvv71lTmIC77-977-9Yu-_ve-_ve-_ve-_vTIU'
const Client = Prismic.client(apiEndpoint, { accessToken })

const BlogPrismic: StorefrontFunctionComponent<BlogPrismicProps> = ({
  numberPosts,
  blogLayout,
  query,
}) => {

  const [posts, setPosts] = useState<any | null>()
  const [postDetail, setPostDetail] = useState<PostInfo>()
  const [typePage, setTypePage] = useState<any | 'home'>()
  const handles = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    const fetchData = async () => {
      let response;

      if (!query.slug) {
        response = await Client.query([
          Prismic.Predicates.at('document.type', 'posts')
        ], {
          fetch: ['posts.title', 'posts.subtitle', 'posts.banner' , 'posts.content', 'posts.author'],
          pageSize: numberPosts,
        })
      } else  {
        response = await Client.query(
          Prismic.Predicates.at('my.posts.uid', query.slug)
        )
      }

      if (response) {
        console.log("response", response)
        if (response.results.length === 1) {
          response = response.results[0]

          const post : PostInfo = {
            uid: response.uid,
            first_publication_date: response.first_publication_date,
            data: {
              title: response.data.title,
              subtitle: response.data.subtitle,
              banner: {
                url : response.data.banner.url,
              },
              author: response.data.author,
              content: response.data.content,
            }
          }
          setPostDetail(post)
          setTypePage('post')
        }
        else {
          const posts = response.results.map(post => {
            return {
              uid: post.uid,
              first_publication_date: post.first_publication_date,
              data: {
                title: post.data.title,
                subtitle: post.data.subtitle,
                banner: {
                  url : post.data.banner.url,
                },
                author: post.data.author,
              },
            }
          })
          setPosts(posts)
          setTypePage('home')
        }
      }
    }
    fetchData()
  }, [])

  const PageComponent = (ComponentType: string) => {
    const MyComponents = {
      home: <Home numberPosts={numberPosts} blogLayout={blogLayout} posts={posts} />,
      blog: <Blog />,
      post: <Post postDetail={postDetail} />
    }

    // @ts-ignore
    return MyComponents[ComponentType] || MyComponents.home
  }

  return (
    <section className={`${handles.blog}`}>
      <div className={`${handles.container} w-100`}>
        {
          typePage ? (
            PageComponent(typePage)
          ) : (
            <h1>Carregando...</h1>
          )
        }
      </div>
    </section>
  )
}

BlogPrismic.schema = {
  title: 'editor.blogprismic.title',
  description: 'editor.blogprismic.description',
  type: 'object',
  properties: {
    numberPosts: {
      title: 'Número de Postagens',
      description: 'Número de Postagens que será exibido',
      type: 'number',
      default: 3,
    },
    blogLayout: {
      title: "Modo de exibição",
      description: 'Mode de exibição dos posts',
      type: "string",
      default: "grid",
      enum: [
        "grid",
        "list",
        "slider"
      ],
      enumNames: [
        "Grid",
        "List",
        "Slider"
      ]
    }
  },
}

export default BlogPrismic

