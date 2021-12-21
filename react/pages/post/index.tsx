import React from "react";
import { FiCalendar, FiUser } from 'react-icons/fi'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { PostContainer, Breadcrumb, PostContent, PostFooter, PostHeader } from './styles'
import { Share } from '../../components/share'
import { RichText } from 'prismic-dom'


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

export const Post = (props: PostInfo | any) => {
  const post = props.postDetail;
  console.log('props post', post)

  return (
    <PostContainer>
      <Breadcrumb>
        <ol>
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Inspiration</a></li>
          <li className="breadcrumb-item active"> {post.data.title} </li>
        </ol>
      </Breadcrumb>

      <div className="post-single">
        <PostHeader>
          <h1 className="title">
            {post.data.title}
          </h1>
          <ul className="meta">
            <li><a href="#"><FiUser className="icons" /> {post.data.author}</a></li>
            <li><a href="#">Trending</a></li>
            <li><FiCalendar className="icons"/>
              {
                format(
                  new Date(post.first_publication_date),
                  'dd MMM yyyy',
                  {
                    locale: ptBR,
                  }
                )
              }
            </li>
          </ul>
        </PostHeader>

        <div className="featured-image">
          <img src={post.data.banner.url} alt={post.data.title} title={post.data.title} />
        </div>

        <PostContent>
          {
            post.data.content.map((content : any, index: any) => (
              <div key={index}>
                <h3> {content.heading} </h3>
                <div dangerouslySetInnerHTML={{ __html: RichText.asHtml(content.body), }} />
              </div>
            ))
          }
        </PostContent>

        <PostFooter>
          <div className="tags">
            <div className="">
              <a href="#" className="tag">#Trending</a>
              <a href="#" className="tag">#Video</a>
              <a href="#" className="tag">#Featured</a>
            </div>

            <Share />
          </div>
        </PostFooter>
      </div>
    </PostContainer>
  )
}