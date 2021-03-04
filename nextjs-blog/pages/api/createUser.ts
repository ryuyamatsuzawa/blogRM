import { NextApiHandler } from "next";
import prisma from "../../lib/prisma";
import * as z from "zod";

const requestUserSchema = z.object({
  name: z.string(),
  email: z.string(),
});

const handler: NextApiHandler = async (req, res) => {
  try {
    const result = requestUserSchema.parse(req.body);
    await prisma.user.create({
      data: {
        name: result.name,
        email: result.email,
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