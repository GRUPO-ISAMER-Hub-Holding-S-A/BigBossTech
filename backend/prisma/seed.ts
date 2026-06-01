import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    await prisma.product.deleteMany();

    await prisma.product.createMany({

        data: [

            {
                name: "iPhone 17 Pro Max",
                description: "256GB, Naranja",
                price: 1310,
                image: "/frontend/assets/image/iphonenaranja.jpg",
                stock: 10,
                category: "iphone"
            },

            {
                name: "iPhone 17 Pro Max",
                description: "256GB, Azul",
                price: 1190,
                image: "/frontend/assets/image/iphoneazul.jpg",
                stock: 12,
                category: "iphone"
            },

            {
                name: "iPhone 17 Pro Max",
                description: "256GB, Negro",
                price: 1150,
                image: "/frontend/assets/image/iphonenegro1.jpg",
                stock: 8,
                category: "iphone"
            },

            {
                name: "iPhone 17 Pro Max",
                description: "256GB, Plateado",
                price: 990,
                image: "/frontend/assets/image/iphonesilver.jpg",
                stock: 15,
                category: "iphone"
            },

                        {
                name: "iPhone 17 ",
                description: "256GB, Sage Green",
                price: 1310,
                image: "/frontend/assets/image/iphonesage.jpg",
                stock: 10,
                category: "iphone"
            },

            {
                name: "iPhone 17 ",
                description: "256GB, Negro",
                price: 1190,
                image: "/frontend/assets/image/iphone17negro.jpg",
                stock: 12,
                category: "iphone"
            },

            {
                name: "iPhone 17",
                description: "256GB, Blanco",
                price: 1150,
                image: "/frontend/assets/image/iphone17blanco.jpg",
                stock: 8,
                category: "iphone"
            },

            {
                name: "iPhone 17",
                description: "256GB, Lavanda",
                price: 990,
                image: "/frontend/assets/image/iphone17lavanda.jpg",
                stock: 15,
                category: "iphone"
            }

        ]

    });

    console.log("PRODUCTOS CARGADOS");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());