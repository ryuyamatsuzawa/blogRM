import useSWR from 'swr'
import React from "react";
import { PostForm } from "../components/PostForm";
import { Posts } from "./api/getPosts"
import Head from 'next/head';
import { LinkForm } from "../components/LinkForm";

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const CreatePost = () => {
  const { data, error } = useSWR<Posts>(`/api/getPosts`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <Head>
        <title>投稿画面</title>
      </Head>
      <LinkForm />
      <PostForm />
    </>
  );
}

export default CreatePost