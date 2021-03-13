import prisma, { User } from "../../lib/prisma";
import type { NextApiHandler } from 'next';
import * as z from "zod";

//ReadonlyにしたらUserの中のすべてのプロパティを返す
export type Users = Pick<User, "id" | "name" | "email" | "password" | "salt" >[];

const requestBodySchema = z.object({
  id: z.number(),
});


const getOneUser: NextApiHandler = async (req, res) => {
  try {
    const user = requestBodySchema.parse(req.body);
    const users = await prisma.user.findMany({
      where: {
        id: user.id
      },
      select: {
        email: true,
        name: true,
        password: true,
        id:true,
        salt: true,
      },
    });
    res.status(200).json(users)
  } catch (error) {
    res.json({ error })
  }
};

export default getOneUser;