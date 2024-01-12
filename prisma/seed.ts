import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {},
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested feature since...',
      description:
        "We are excited to share that today's prisma ORM release adds stable support...",
      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma?" },
    update: {},
    create: {
      title: "What's new in Prisma?",
      body: 'Our engineers have been working hard, issuing new releases with many improvements',
      description:
        'Learn about everything in the Prisma ecosystem and community',
      published: true,
    },
  });

  console.log({ post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
