import styled from 'styled-components';

export const Posts = styled.div`
  .swiper-button-prev {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%234c71ae'%2F%3E%3C%2Fsvg%3E") !important;
  }

  .swiper-button-next {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%234c71ae'%2F%3E%3C%2Fsvg%3E") !important;
  } 
  
`;

export const Card = styled.div`
  border: solid 1px #EBEBEB;
  border-radius: 10px;
`;

export const CardThumbnail = styled.div`
  position: relative;
  
  .category-badge {
    color: #FFF;
    font-size: 13px;
    border-radius: 25px;
    display: inline-block;
    padding: 6px 11px;
    line-height: 1;
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 1;
    background: #FE4F70;
    background: linear-gradient(to right, #FE4F70 0%, #FFA387 51%, #FE4F70 100%);
    background-size: 200% auto;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
  } 
  
  .inner {
    margin-top: -1px;
    margin-left: -1px;
    margin-right: -1px;
    overflow: hidden;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    
    img {
      max-width: 100%;
      height: auto;
      transform: scale(1);
      transition: all 0.3s ease-in-out;
    }
  }
    
`;

export const CardContent = styled.div`
  padding: 30px;
  background: #ffffff;
  
  ul.meta {
    font-size: 14px;
    color: #9faabb;
    margin-bottom: 0;
    margin-top: 0;
    padding-left: 0;
    list-style: none;
    
    li {
      display: inline-block;

      &:not(:last-child) {
        margin-right: 0.8rem;
        
        &:after {
          content: "";
          display: inline-block;
          background-color: #FE4F70;
          border-radius: 50%;
          margin-left: 1rem;
          height: 3px;
          vertical-align: middle;
          position: relative;
          top: -1px;
          width: 3px;
        }
      }
      
      a {
        text-decoration: none;
        color: #9faabb;
        font-weight: 400;
      }
      
      .icons {
        margin-right: 10px;
        position: relative;
        top: 1px;
      }
    }
  }

  .post-title {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.4;
    margin: 1rem 0;

    a {
      color: #203656;
      text-decoration: none;
    }
  }

  .excerpt {
    font-size: 14px;
    line-height: 1.4;
    font-weight: 400;
    margin-bottom: 0;
    
    a {
      color: #203656;
      text-decoration: none;      
    }
  }  
`;