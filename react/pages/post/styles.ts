import styled from 'styled-components';

export const PostContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  display: block;  
  
  .featured-image {
    margin-bottom: 30px;
    
    img {
      border-radius: 10px;
      max-width: 100%;
      height: auto;
      margin: 0 auto 30px;
      display: block;
    }
  }
  
`;

export const Breadcrumb = styled.nav`

  ol {
    font-size: 14px;
    padding: 0;
    margin-bottom: 20px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    
     li.breadcrumb-item {
       display: inline-block;
       
       &:not(:first-child) {
         &:before {
           float: left;
           padding-right: 0.5rem;
           padding-left: 0.5rem;
           color: #6c757d;
           content: "/";           
         }         
       }
       
       a {
         color: #9faabb;
         text-decoration: none;

         &.active {
           color: #9faabb;
         }         
       }       
     }
  }
`;

export const PostHeader = styled.div`
  margin-bottom: 30px;

  .title {
    font-size: 36px;
    font-weight: 700;
    line-height: 1.4;
    margin-top: 0;
    margin-bottom: 1rem;
  }

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
    
`;

export const PostContent = styled.div`
  color: #707a88;
  font-size: 16px;
  
  p {
    margin-bottom: 1rem;
    line-height: 1.7;
  }
    
`;

export const PostFooter = styled.div`
    
`;

