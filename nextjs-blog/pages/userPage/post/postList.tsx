import React from "react";
import useSWR,{ mutate,trigger } from 'swr';
import { Posts } from "../../api/getPosts";
import Divider from '@material-ui/core/Divider';
import Head from 'next/head';
import { LinkForm } from "../../../components/LinkForm";
import Link from 'next/link'
import { Button } from "@material-ui/core";
import axios from "axios";

//個人投稿一覧を持ってきたい。

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const PostedPost = () => {
  const { data, error } = useSWR<Posts>(`/api/getPosts`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div id="postList">
      <Head>
        <title>ユーザーの投稿編集</title>
      </Head>
      <LinkForm />
      <h1>ユーザーの投稿編集</h1>
      <div>全体で{data.length}個の投稿があります</div>
      <div>
        <Link href="/userPage/post/postForm">
          <a>投稿する</a>
        </Link>
      </div>
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
                <Link href="/userPage/post/editForm">
                  <a><Button style={{color:'blue'}}>編集する</Button></a>
                </Link>
                <Button style={{color:'red'}}
                 onClick={ async ()=>{

                  const deleteUrl = '/userPage/post/postList'+ post.id;
                  const url = '/userPage/post/postList';

                  //mutateで画面を書き換える（削除予定のidを除いたデータにフィルタリング）
                  mutate (url, data.filter(c => c.id !== post.id),false);

                  //ここにaxiosで削除処理(サンプルとしてdeleteメソッド)
                  await axios.delete(deleteUrl);

                   //triggerでswr起動
                   trigger(url);
              }}
                >削除する</Button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default PostedPost;