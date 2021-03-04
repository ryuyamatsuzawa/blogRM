import React from "react";
import useSWR from 'swr'
import { Posts } from "./api/getPosts"



const fetcher = (url: string) => fetch(url).then((res) => res.json())

const PostedPost = () => {
  const { data, error } = useSWR<Posts>(`/api/getPosts`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <div>全体で{data.length}つの投稿があります</div>
      {data.map((post) => {
        return (
          <>
          <label htmlFor="postedTitle">投稿内容:</label>
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
          </>
        );
      })}
    </>
  );
}

export default PostedPost;