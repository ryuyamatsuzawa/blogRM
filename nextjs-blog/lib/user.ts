import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from './db';

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

export async function createUser({ username, password }: {username:string,password:any}) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    username,
    hash,
    salt,
  }

  try {
    const result = await excuteQuery({
        query: 'INSERT INTO users (id, createdAt, username, hash, salt) VALUES(?, ?, ?, ?, ?)',
        values: [user.id, user.createdAt.toString(), user.username, user.hash, user.salt],
    });
    console.log( result );
} catch ( error ) {
    console.log( error );
}

return user;
}

// Here you should lookup for the user in your DB
export async function findUser({ username }:{username:string}) {
  try {
      const result = await excuteQuery({
          query: 'SELECT * FROM users WHERE email = ?',
          values: [ username ],
      });
      return result[0];
  } catch (error) {
      console.log(error);
  }
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user:any, inputPassword:any) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}