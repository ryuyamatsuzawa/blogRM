import React from "react";
import { PostForm } from "../components/PostForm";
import useSWR from 'swr'
import { Posts } from "./api/getPosts"



const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index() {
  const { data, error } = useSWR<Posts>(`/api/getPosts`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
   <div>Hello</div>
  );
}
