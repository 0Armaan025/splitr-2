import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "random@gmail.com",
      name: 'random'
    },
  });
  console.log(user);
}

main();
