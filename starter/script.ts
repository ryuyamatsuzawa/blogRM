import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// データベースにクエリを送信するためにmain関数を定義する。
// A `main` function so that you can use async/await
async function main() {
 const post = await prisma.post.update({
   where: { id: 2 },
   data: { published: true },
 })
 console.log(post);
 

//Userクエリを追加して、データベースからすべてのレコードを読み取り、結果を出力する。
//findMany()でレコードのリストを表示する。
  const allUsers = await prisma.user.findMany({
    //include optionを使用することにより、リレーション操作がしやすくなり、書くユーザのpostを取得できる。
    include: { posts:true },
  })
   // use `console.dir` to print nested objects
   console.dir(allUsers, { depth: null })
}


main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
