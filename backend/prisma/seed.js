const {PrismaClient} = require("@prisma/client");
const scrypt = require("../util/scrypt");
const prisma = new PrismaClient();

const main = async () => {
    let salt;

    salt = scrypt.generateSalt();
    await prisma.user.upsert({
        where: {name: "test"},
        update: {},
        create: {
            name: "test",
            password: scrypt.calcHash("test", salt),
            salt,
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });