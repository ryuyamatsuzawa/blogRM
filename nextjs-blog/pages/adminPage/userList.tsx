import React from "react";
import useSWR from 'swr';
import { Users } from "../api/getUsers";
import Head from 'next/head';
import { LinkForm } from "../../components/LinkForm";
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const PostedUser = () => {
  const { data, error } = useSWR<Users>(`/api/getUsers`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div id="userList">
      <Head>
        <title>ユーザー情報一覧</title>
      </Head>
      <LinkForm />
      <h1>ユーザー情報一覧</h1>
      <div>全体で{data.length}人のユーザーがいます</div>
      <Link href="/adminPage/userForm">
        <a>新しいユーザー作成</a>
      </Link>
      <div className="userContainer">
        {data.map((user) => {
          return (
            <React.Fragment key={user.id}>
              <div className="userDetail">
                <div className="userForm">
                  <label htmlFor="postedName">ユーザー名:</label>
                  <p id="postedName">{user.name}</p>
                </div>
                <div className="userForm">
                  <label htmlFor="postedEmail">メールアドレス:</label>
                  <p id="postedEmail">{user.email}</p>
                </div>
                <button>削除</button>
                <button>編集</button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default PostedUser;