import React, { useState, useEffect } from 'react'
import Prismic from '@prismicio/client'
import {FiCalendar, FiUser} from 'react-icons/fi'
import {Link} from 'vtex.render-runtime'
import { RichText } from 'prismic-dom'
import { FormattedMessage } from 'react-intl'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import {useCssHandles} from 'vtex.css-handles'

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
  blogLayout: string;
  query: {
    slug: string;
  }
}

const CSS_HANDLES = [
  'container',
  'blog',
  'posts',
  'titleBlog',
  'subtitleBlog',
  'containerText',
  'titlePost',
  'subtitlePost',
  'gridPosts',
  'listPosts',
  'posts',
  'titlePost',
  'subtitlePost',
  'contentPost',
  'imagePost',
  'containerIcons',
  'iconsPost',
  'svgPost',
  'bgImagePost',
  'bodyPost'
]

const apiEndpoint = 'https://my-blogignite.prismic.io/api/v2'
const accessToken = 'MC5ZVHo1ZlJBQUFDSUEyS1Q0.NH5w77-977-9fe-_vQjvv70677-977-9Re-_vVZrcVLvv71lTmIC77-977-9Yu-_ve-_ve-_ve-_vTIU'
const Client = Prismic.client(apiEndpoint, { accessToken })

const BlogPrismic: StorefrontFunctionComponent<BlogPrismicProps> = ({ title, subtitle, numberPosts, blogLayout, query } : BlogPrismicProps ) => {

  const [posts, setPosts] = useState<any | null>()
  const [postDetail, setPostDetail] = useState<any | null>()
  const titleBlog = title || <FormattedMessage id="prismicblog.title" />
  const subtitleBlog = subtitle || <FormattedMessage id="prismicblog.subtitle" />
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
          const post = {
            first_publication_date: response.first_publication_date,
            data: {
              title: response.data.title,
              banner: {
                url : response.data.banner.url,
              },
              author: response.data.author,
              content: response.data.content,
            },
          }
          setPostDetail(post)
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
        }
      }
    }
    fetchData()
  }, [])

  return (
    <section className={`${handles.blog}`}>
      <div className={`${handles.container} w-100`}>

        {
          postDetail ? (
            <>
              <div className={`${handles.bgImagePost}`} style={{ backgroundImage: `url(${postDetail.data.banner.url})` }}/>
              <div>
                <h1> {postDetail.data.title} </h1>
                <span>
                  <FiCalendar/>
                  {
                    format(
                        new Date(postDetail.first_publication_date),
                        'dd MMM yyyy',
                        {
                          locale: ptBR,
                        },
                    )
                  }
                </span>
                <span> <FiUser /> {postDetail.data.author} </span>

                <div className={`${handles.bodyPost}`}>
                  {
                    postDetail.data.content.map((content : any, index: any) => (
                    <div key={index}>
                      <h3> {content.heading} </h3>
                      <div
                         dangerouslySetInnerHTML={{ __html: RichText.asHtml(content.body), }}
                      />
                    </div>
                    ))
                  }
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className={`${handles.titleBlog}`}>{titleBlog} {blogLayout}</h2>
              <h4 className={`${handles.subtitleBlog}`}>{subtitleBlog}</h4>

              {
                posts ? (
                  <div className={` ${blogLayout == 'grid' ? `${handles.gridPosts}` : `${handles.listPosts}` }`} >
                    {
                      posts.map((post: Post ) => (
                      <div className={`${handles.posts}`} key={post.uid}>
                        <img className={`${handles.imagePost}`}
                             src={post.data.banner.url}
                             alt={post.data.title}
                             title={post.data.title}/>
                          <div className={`${handles.containerIcons}`}>
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
                        </div>

                        <div className={`${handles.containerText}`}>
                          <Link to={`/blog/?slug=${post.uid}`}>
                            <h2 className={`${handles.titlePost}`}>{post.data.title}</h2>
                          </Link>
                          <h5 className={`${handles.subtitlePost}`}>{post.data.subtitle}</h5>
                        </div>
                      </div>
                      ))
                    }
                  </div>
                ) : <div>Carregando</div>
              }
            </>
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
    blogLayout: {
      title: "Modo de exibição",
      description: 'Mode de exibição dos posts',
      type: "string",
      default: "grid",
      enum: [
        "grid",
        "list"
      ],
      enumNames: [
        "Grid",
        "List"
      ]
    }
  },
}

export default BlogPrismic

