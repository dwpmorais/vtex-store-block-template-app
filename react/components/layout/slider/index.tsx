import React from "react"
import { Card, CardContent, CardThumbnail } from '../grid/styles'
import { Link } from 'vtex.render-runtime'
import { FiCalendar, FiUser } from 'react-icons/fi'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import TextTruncate from 'react-text-truncate'
import Swiper from 'react-id-swiper'
import { Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/swiper.esm';

interface blogProps {
  numberPosts: number;
  posts: [];
}

interface PostInfo {
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

export const Slider = (props: blogProps) => {
  const posts = props.posts

  const params = {
    loop: false,
    modules: [Navigation],
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      }
    }
  }

  return (
    <Swiper {...params}>
      {
        posts.map((post: PostInfo) => (
          <Card key={post.uid}>
            <CardThumbnail>
              <Link to="#" className="category-badge">
                Lifestyle
              </Link>

              <Link to="#">
                <div className="inner">
                  <img src={post.data.banner.url} alt={post.data.title} title={post.data.title} />
                </div>
              </Link>
            </CardThumbnail>

            <CardContent>
              <ul className="meta">
                <li className="list-inline-item">
                  <FiUser className="icons" /> {post.data.author}
                </li>
                <li className="list-inline-item">
                  <FiCalendar className="icons"/>
                  {
                    format(
                      new Date(post.first_publication_date),
                      'dd MMM yyyy',
                      {
                        locale: ptBR,
                      },
                    )
                  }
                </li>
              </ul>

              <h5 className="post-title">
                <Link to={`/post/?slug=${post.uid}`}>
                  {post.data.title}
                </Link>
              </h5>

              <TextTruncate
                line={2}
                element="p"
                truncateText="…"
                containerClassName="excerpt"
                text={post.data.subtitle}
                textTruncateChild={<Link to={`/post/?slug=${post.uid}`}>Leia mais</Link>}
              />

            </CardContent>
          </Card>
        ))
      }
    </Swiper>
  )
}