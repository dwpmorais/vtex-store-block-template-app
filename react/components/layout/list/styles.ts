import styled from 'styled-components';

export const Posts = styled.div`
  display: block;  
`;

export const Card = styled.div`
  border: solid 1px #EBEBEB;
  border-radius: 10px;
  display: inline-flex;
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CardThumbnail = styled.div`
  position: relative;
  width: 30%;
  
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
  width: 70%;
  
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