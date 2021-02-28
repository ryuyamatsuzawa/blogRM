import prisma from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'

export interface Post {
  title: string,
  content: string,
  id: number,
}{}

export default async(req: NextApiRequest, res: NextApiResponse<Post>) => {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      id: true,
    },
  });
  res.status(200).json(posts)
};