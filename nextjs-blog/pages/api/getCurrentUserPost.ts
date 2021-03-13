import prisma, { Post } from "../../lib/prisma";
import type { NextApiHandler } from 'next'
import * as z from "zod";

//pickじゃなくてemitを使うと全体の型から省略できる。
export type Posts = Pick<Post, "id" | "title" | "content" | "createdAt" | "authorId">[];

const requestUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  id: z.number(),
});

const getCurrentUserPost: NextApiHandler = async (req, res) => {
  try {
    const user = requestUserSchema.parse(req.body);
    const postList = await prisma.post.findMany({
      where: {
        authorId: user.id,
      },
      select: {
        title: true,
        content: true,
        id: true,
        createdAt: true,
        authorId: true,
      },
    });
  res.status(200).json(postList);
  } catch (error) {
    res.json({ error })
  }
};

export default getCurrentUserPost;