import type { GetServerSideProps } from "next";
import React from "react";
import { PostForm } from "../components/PostForm";
import prisma, { Post } from "../lib/prisma";
import useSWR from 'swr'
import { Post } from "./api/getPosts"

type Props = {
  posts: Pick<Post, "id", "title" | "content">[];
};

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index() {
  const { data, error } = useSWR<Post>(`/api/getPosts`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  
  return (
    <>
      <PostForm />
      <div>post count: {data.length}</div>
      {data.map((post) => {
        return (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        );
      })}
    </>
  );
}
