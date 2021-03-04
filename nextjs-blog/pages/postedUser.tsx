import React from "react";
import useSWR from 'swr'
import { Users } from "./api/getUsers"



const fetcher = (url: string) => fetch(url).then((res) => res.json())

const PostedUser = () => {
  const { data, error } = useSWR<Users>(`/api/getUsers`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <div>全体で{data.length}人のユーザーがいます</div>
      {data.map((user) => {
        return (
          <>
          <label htmlFor="postedTitle">ユーザー情報:</label>
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
          </>
        );
      })}
    </>
  );
}

export default PostedUser;