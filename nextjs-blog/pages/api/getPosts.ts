import prisma, { Post } from "../../lib/prisma";
import type { NextApiHandler } from 'next'

export type Posts = Pick<Post, "id" | "title" | "content">[];
//pickじゃなくてemitを使うと全体の型から省略できる。

const getPost: NextApiHandler = async (req, res) => {
  try {
  const posts = await prisma.post.findMany({
    //selectをつかうと（Prismaのドキュメント）、trueのやつのみ返せる。
      select: {
        title: true,
        content: true,
        id: true,
      },
    });
  res.status(200).json(posts);
} catch (error) {
  res.json({ error }) 
}
};

export default getPost;