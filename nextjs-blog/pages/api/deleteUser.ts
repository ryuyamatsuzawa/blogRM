import { NextApiHandler } from "next";
import prisma from "../../lib/prisma";
import * as z from "zod";

const requestUserSchema = z.object({
  id: z.number(),
});

const deleteUser: NextApiHandler = async (req, res) => {
  try {
    const del = requestUserSchema.parse(req.body);
    await prisma.user.delete({
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

export default deleteUser;
