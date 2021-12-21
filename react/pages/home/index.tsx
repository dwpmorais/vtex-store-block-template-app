import React from "react";
import { Grid } from '../../components/layout/grid'
import { List } from '../../components/layout/list'
import { Slider } from '../../components/layout/slider'

interface blogProps {
  numberPosts: number;
  blogLayout: string;
  posts: [];
}

export const Home = (props: blogProps) => {
  console.log('console' , props )

  const LayoutComponent = (ComponentType: string) => {
    const MyComponentsLayout = {
      grid:   <Grid   numberPosts={props.numberPosts} posts={props.posts} />,
      list:   <List   numberPosts={props.numberPosts} posts={props.posts} />,
      slider: <Slider numberPosts={props.numberPosts} posts={props.posts} />
    }

    // @ts-ignore
    return MyComponentsLayout[ComponentType] || MyComponentsLayout.grid
  }

  return (
    <>
      <h2 className="">Blog</h2>
      <h4 className="">Últimos Posts</h4>
      {
        LayoutComponent(props.blogLayout)
      }
    </>
  )
}