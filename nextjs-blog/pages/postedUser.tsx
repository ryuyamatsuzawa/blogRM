import React from "react";
import useSWR from 'swr'
import { Users } from "./api/getUsers"



const fetcher = (url: string) => fetch(url).then((res) => res.json())

const PostedUser = () => {
  const { data, error } = useSWR<Users>(`/api/getUsers`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div id="userList">
      <h1>ユーザー情報一覧</h1>
      <div>全体で{data.length}人のユーザーがいます</div>
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
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default PostedUser;