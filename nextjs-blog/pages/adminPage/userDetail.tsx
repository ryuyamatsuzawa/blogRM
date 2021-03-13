import React from "react";
import useSWR from 'swr';
import { Users } from ".././api/getOneUser";
import { Form, Field } from "react-final-form";
import Head from 'next/head';
import { LinkForm } from "../../components/LinkForm";
import Link from 'next/link'
import { Button } from "@material-ui/core";
import axios from "axios";

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const UserDetailForm = () => {
  const { data, error } = useSWR<Users>(`/api/getOneUser`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log(data)

  return (
    <form id="detailUser">
      <div className="detailContainer">
        <h2>ユーザー詳細</h2>
        <Field<HTMLInputElement>
          name="name"
          placeholder="name"
          render={(user) => {
            return (
              <div className="detailFormGroup" key={user.id}>
                <label>名前:</label>
                <input
                 {...user.name}
                  style={{ width: "20vw" }}
                  type="text"
                  required
                />
              </div>
            );
          }}
        />
        <Field<HTMLInputElement>
          name="email"
          placeholder="email"
          render={(user) => {
            return (
              <div className="detailFormGroup" key={user.id}>
                <label>メールアドレス:</label>
                <input
                  {...user.email}
                  type="email"
                  style={{ width: "20vw" }}
                  required
                />
              </div>
            );
          }}
        />
        <Field<HTMLInputElement>
          name="password"
          placeholder="password"
          render={(user) => {
            return (
              <div className="detailFormGroup" key={user.id}>
                <label>パスワード:</label>
                <input
                  {...user.password}
                  style={{ width: "20vw" }}
                  type="password"
                  required
                />
              </div>
            );
          }}
        />
        <Button
          style={{ color: 'blue' }}
          // onClick={() => {
          //   axios.delete('/api/deleteUser', { data: { id: user.id } }).then(res => {
          //     console.log(res.data);
          //   })
          // }}
        >登録</Button>
      </div>
    </form>
  );
}

export default UserDetailForm;