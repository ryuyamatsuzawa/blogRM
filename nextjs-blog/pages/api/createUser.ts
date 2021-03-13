import { NextApiHandler } from "next";
import prisma from "../../lib/prisma";
import * as z from "zod";
import crypto from 'crypto';

const requestUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

const handler: NextApiHandler = async (req, res) => {
  try {
    const result = requestUserSchema.parse(req.body);
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto
    .pbkdf2Sync(result.password, salt, 1000, 64, 'sha512')
    .toString('hex')
    await prisma.user.create({
      data: {
        name: result.name,
        email: result.email,
        password: hash,
        salt,
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
