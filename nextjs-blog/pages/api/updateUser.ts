import { NextApiHandler } from "next";
import prisma from "../../lib/prisma";
import * as z from "zod";
import crypto from 'crypto';

const requestUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  id: z.number(),
});

const updateUser: NextApiHandler = async (req, res) => {
  try {
    const update = requestUserSchema.parse(req.body);
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto
    .pbkdf2Sync(update.password, salt, 1000, 64, 'sha512')
    .toString('hex')
    await prisma.user.update({
      where: {
        id: update.id,
      },
      data: {
        name: update.name,
        email: update.email,
        password: hash,
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

export default updateUser;
