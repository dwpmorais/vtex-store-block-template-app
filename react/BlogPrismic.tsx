import React, { useState, useEffect } from 'react'
import Prismic from '@prismicio/client'
import { FiCalendar, FiUser } from 'react-icons/fi'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { FormattedMessage } from 'react-intl'
import {useCssHandles} from 'vtex.css-handles';
import {Link} from 'vtex.render-runtime';

interface Post {
  uid?: string;
  first_publication_date: string;
  data: {
    title: string;
    subtitle: string;
    banner: {
      url: string;
    };
    author: string;
  };
}

interface BlogPrismicProps {
  numberPosts: number;
  title: string;
  subtitle: string;
}

const CSS_HANDLES = ['container', 'blog', 'posts', 'titleBlog', 'subtitleBlog', 'titlePost', 'subtitlePost', 'gridPosts', 'posts', 'titlePost' , 'subtitlePost' , 'contentPost' , 'imagePost' , 'iconsPost', 'svgPost' ]

const apiEndpoint = 'https://my-blogignite.prismic.io/api/v2'
const accessToken = 'MC5ZVHo1ZlJBQUFDSUEyS1Q0.NH5w77-977-9fe-_vQjvv70677-977-9Re-_vVZrcVLvv71lTmIC77-977-9Yu-_ve-_ve-_ve-_vTIU'
const Client = Prismic.client(apiEndpoint, { accessToken })

const BlogPrismic: StorefrontFunctionComponent<BlogPrismicProps> = ({ title, subtitle, numberPosts } : BlogPrismicProps ) => {

  const [posts, setPosts] = useState<any | null>();
  const titleBlog = title || <FormattedMessage id="prismicblog.title" />
  const subtitleBlog = subtitle || <FormattedMessage id="prismicblog.subtitle" />
  const handles = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    const fetchData = async () => {
      const response = await Client.query([
        Prismic.Predicates.at('document.type', 'posts')
      ], {
        fetch: ['posts.title', 'posts.subtitle', 'posts.banner' , 'posts.content', 'posts.author'],
        pageSize: numberPosts,
      })

      if (response) {
        console.log("response", response)
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
      }
    }
    fetchData()
  }, [])

  return (
    <section className={`${handles.blog}`}>
      <div className={`${handles.container} w-100`}>
        <h2 className={`${handles.titleBlog}`}>{titleBlog}</h2>
        <h4 className={`${handles.subtitleBlog}`}>{subtitleBlog}</h4>

        {
          posts ? (
            <div className={`${handles.gridPosts}`}>
              { posts.map((post: Post ) => (
                <div className={`${handles.posts}`} key={post.uid}>
                  <img className={`${handles.imagePost}`}
                       src={post.data.banner.url}
                       alt={post.data.title}
                       title={post.data.title}/>

                  <span className={`${handles.iconsPost}`}><FiCalendar className={`${handles.svgPost}`} />
                    {
                      format(
                        new Date(post.first_publication_date),
                        'dd MMM yyyy',
                        {
                          locale: ptBR,
                        },
                      )
                    }
                  </span>
                  <span className={`${handles.iconsPost}`}><FiUser className={`${handles.svgPost}`} /> {post.data.author} </span>
                  <Link to={`/blog/?slug=${post.uid}`}>
                    <h2 className={`${handles.titlePost}`}>{post.data.title}</h2>
                  </Link>
                  <h5 className={`${handles.subtitlePost}`}>{post.data.subtitle}</h5>
                </div>
                ))
              }
            </div>
          ) : <div>Carregando</div>
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
      default: 4,
    },
    title : {
      title: 'Título',
      type: 'string',
      default: 'null',
    },
    subtitle : {
      title: 'Sub-Título',
      type: 'string',
      default: 'null',
    },
  },
}

export default BlogPrismic

