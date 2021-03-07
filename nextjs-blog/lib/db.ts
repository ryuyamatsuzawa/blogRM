import mysql from 'serverless-mysql';

interface Idb  {
  username:string;
  password:any;
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

export default async function excuteQuery({ query, values }:{query:Idb,values:Idb}) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}