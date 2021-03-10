import useSWR from 'swr';
import React from "react";
import { UserForm } from "../../components/UserForm";
import { LinkForm } from "../../components/LinkForm";
import { Users } from "../api/getUsers";
import Head from 'next/head';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const CreateUser = () => {
  const { data, error } = useSWR<Users>(`/api/getUsers`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <Head>
        <title>ユーザー登録</title>
      </Head>
      <LinkForm />
      <UserForm />
    </>
  );
}

export default CreateUser