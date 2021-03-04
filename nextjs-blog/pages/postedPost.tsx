import React from "react";
import useSWR from 'swr'
import { Posts } from "./api/getPosts"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const PostedPost = () => {
  const { data, error } = useSWR<Posts>(`/api/getPosts`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div id="postList">
      <h1>投稿一覧</h1>
      <div>全体で{data.length}個の投稿があります</div>
      <div className="postContainer">
        {data.map((post) => {
          return (
            <React.Fragment key={post.id} >
              <div className="postDetail">
                <div className="postForm">
                  <label htmlFor="postedTitle">タイトル:</label>
                  <h3 id="postedTitle">{post.title}</h3>
                </div>
                <div className="postForm">
                  <label htmlFor="postedContent">内容:</label>
                  <p id="postedContent">{post.content}</p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default PostedPost;