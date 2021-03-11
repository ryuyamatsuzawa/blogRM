import { NextApiHandler } from "next";
import prisma from "../../lib/prisma";
import * as z from "zod";

const requestBodySchema = z.object({
  title: z.string().min(1),
  content: z.string(),
  authorId: z.number(),
});

const handler: NextApiHandler = async (req, res) => {
  try {
    const result = requestBodySchema.parse(req.body);
    await prisma.post.create({
      data: {
        authorId: result.authorId,
        title: result.title,
        content: result.content,
        createdAt: (new Date()).toISOString(),
        published: true,
      },
    });
    res.json({
      ok: true,
    });
    return;
  } catch (error) {
    res.json({ ok: false, error });
  }
};

export default handler;