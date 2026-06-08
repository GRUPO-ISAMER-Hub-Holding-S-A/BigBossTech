import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

    const email = 'admin@bigboss.com';

    const exists = await prisma.user.findUnique({
        where: { email }
    });

    if (exists) {
        console.log('ADMIN YA EXISTE');
        return;
    }

    const password = await bcrypt.hash(
        'BigBoss2026!',
        12
    );

    await prisma.user.create({
        data: {
            email,
            password,
            role: 'ADMIN'
        }
    });

    console.log('ADMIN CREADO');
    console.log('EMAIL: admin@bigboss.com');
    console.log('PASSWORD: BigBoss2026!');
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });