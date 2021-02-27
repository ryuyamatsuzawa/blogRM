import { getSortedPostsData } from '../lib/posts'
import  { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

type Props = {
  count: number;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const count = await prisma.user.count();
  return {
    props: {
      count,
    },
  };
};

export default function Index(props: Props) {
  return <div>user count: {props.count}</div>;
}
