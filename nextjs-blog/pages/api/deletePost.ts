import { NextApiHandler } from "next";
import prisma from "../../lib/prisma";
import * as z from "zod";

const requestUserSchema = z.object({
  id: z.number(),
});

const deletePost: NextApiHandler = async (req, res) => {
  try {
    const del = requestUserSchema.parse(req.body);
    await prisma.post.delete({
      where: {
        id: del.id
      }
    });
    res.json({
      ok: true,
    });
    return;
  } catch (error) {
    res.json({ ok: false, error });
  }
};

export default deletePost;