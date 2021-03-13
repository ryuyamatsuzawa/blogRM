import Local from 'passport-local'
import crypto from 'crypto';
import prisma from './prisma';

export function validatePassword(user:any, inputPassword:any) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.password === inputHash
  return passwordsMatch
}

export const localStrategy = new Local.Strategy(async function (
  email,
  password,
  done
) {
  const user = await prisma.user.findUnique({where:{
    email
  }})
  // ! If there is no user, return error

  const isPasswordValid = validatePassword(user, password)

  // ! If the password is wrong, return error

  if(isPasswordValid) {
    done(null, user)
  }
})