import mysql from 'serverless-mysql';

interface Idb  {
  query:any
  values:any 
}

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: 3306,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }
});

//外部（user.ts）から接続マネージャーのインスタンスにアクセスするための関数（excuteQuery）を追加。

export default async function excuteQuery({ query, values }:Idb) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}