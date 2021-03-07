import React from "react";
import useSWR from 'swr';
import { Posts } from "./api/getPosts";
import Divider from '@material-ui/core/Divider';
import Head from 'next/head';
import { LinkForm } from "../components/LinkForm";

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const PostedPost = () => {
  const { data, error } = useSWR<Posts>(`/api/getPosts`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div id="postList">
      <Head>
        <title>投稿一覧</title>
      </Head>
      <LinkForm />
      <h1>投稿一覧</h1>
      <div>全体で{data.length}個の投稿があります</div>
      <div className="postContainer">
        {data.map((post) => {
          return (
            <React.Fragment key={post.id} >
              <div className="postDetail">
                <div className="postForm">
                  <label htmlFor="postedDate">作成日:</label>
                  <p className="postedDate">{post.createdAt}</p>
                </div>
                <Divider light />
                <div className="postForm">
                  <label htmlFor="postedTitle">タイトル:</label>
                  <p className="postedTitle">{post.title}</p>
                </div>
                <Divider light />
                <div className="postForm">
                  <label htmlFor="postedContent">内容:</label>
                  <p className="postedContent">{post.content}</p>
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