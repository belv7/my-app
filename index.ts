import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

// PostgreSQL に接続するためのコネクションプールとアダプターを用意する
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ["query"] });

async function main() {
  console.log("DBにユーザーを登録中...");
  // ユーザーを 1 件追加してみる
  await prisma.user.create({
    data: { name: `ユーザー ${new Date().toISOString()}` },
  });

  // 登録されたユーザーを全員取得する
  const users = await prisma.user.findMany();
  console.log("現在のユーザー一覧:", users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    // prisma と pool の両方を閉じないと、プログラムが終わらないので注意じゃ
    Promise.all([prisma.$disconnect(), pool.end()]);
  });
