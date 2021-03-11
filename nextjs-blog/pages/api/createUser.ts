import { NextApiHandler } from "next";
import prisma from "../../lib/prisma";
import * as z from "zod";
import crypto from 'crypto';

const requestUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
});

const handler: NextApiHandler = async (req, res, name, password) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
  .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
  .toString('hex')

  try {
    const result = requestUserSchema.parse(req.body);
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
