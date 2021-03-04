import useSWR from 'swr';
import React from "react";
import { UserForm } from "../components/UserForm";
import { Users } from "./api/getUsers";

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const CreateUser = () => {
  const { data, error } = useSWR<Users>(`/api/getUsers`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
      <UserForm />
  );
}

export default CreateUser