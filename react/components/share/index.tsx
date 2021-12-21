import React from "react";
import {
  FacebookShareButton,
  FacebookIcon
} from "react-share";

export const Share = () => {

  return (
    <FacebookShareButton url='https://www.uol.com.br'>
      <FacebookIcon size={32} round={true}  />
    </FacebookShareButton>
  )
}