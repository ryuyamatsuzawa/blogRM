import prisma, { Post } from "../../lib/prisma";
import type { NextApiHandler } from 'next'

//pickじゃなくてemitを使うと全体の型から省略できる。
export type Posts = Pick<Post, "id" | "title" | "content" | "createdAt" | "authorId">[];

const getUserPost: NextApiHandler = async (req, res) => {
  try {
    const userPost = await prisma.post.findMany({
      where: {
        authorId: Number()
      },
    })
  res.status(200).json(userPost);
  } catch (error) {
    res.json({ error })
  }
};

export default getUserPost;