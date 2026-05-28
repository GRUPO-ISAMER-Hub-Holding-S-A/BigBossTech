import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    await prisma.product.createMany({
        data: [
            {
                name: 'iPhone 17 Pro Max',
                description: '256GB Desert Orange',
                price: 1310,
                image: 'https://bigbosstech.com/products/iphone17.jpg',
                stock: 12,
                category: 'smartphones'
            },
            {
                name: 'Samsung Galaxy S26 Ultra',
                description: '512GB Titanium',
                price: 1499,
                image: 'https://bigbosstech.com/products/s26.jpg',
                stock: 8,
                category: 'smartphones'
            },
            {
                name: 'MacBook Pro M5',
                description: '16 pulgadas',
                price: 2899,
                image: 'https://bigbosstech.com/products/macbook.jpg',
                stock: 5,
                category: 'laptops'
            }
        ]
    });

    console.log('✅ Seed completed');
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });