import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

    const email = 'admin@bigboss.com';

    const password = 'BigBoss123';

    const hash = await bcrypt.hash(password, 10);

    const exists = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (exists) {

        console.log('ADMIN YA EXISTE');
        return;
    }

    const admin = await prisma.user.create({
        data: {
            email,
            password: hash,
            role: 'ADMIN'
        }
    });

    console.log('ADMIN CREADO');
    console.log(admin);
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });