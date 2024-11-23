import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const initialPosts: Prisma.PostCreateInput[] = [
  {
    title: 'Post 1',
    slug: 'post-1',
    content: 'Content of post 1',
    author: {
      connectOrCreate: {
        where: {
          email: 'john@mail.com',
        },
        create: {
          email: 'john@mail.com',
          hashPassword: 'hskrhkakejghlas',
        },
      }
    }
  },
];

async function main() {
  console.log('Start seeding....');

  for (const post of initialPosts) {
    const newPost = await prisma.post.create({
      data: post,
    });
    console.log(`Create post with id: ${newPost.id}`);
  }

  console.log('Seeding finish');
  
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });