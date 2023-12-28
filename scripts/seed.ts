const {PrismaClient} = require("@prisma/client");

const db = new PrismaClient();

async function main(){
  try {
    await db.category.createMany({
      data: [
        { name: "famouse People"},
        { name: "movie & TV"},
        { name: "Musicians"},
        { name: "Games"},
        { name: "Animals"},
        { name: "Philosophy"},
        { name: "Scientists"}
      ]
    })
  } catch (error) {
    console.error("error seeding default categories", error);
  } finally{
    await db.$disconnect();
  }
};

main();