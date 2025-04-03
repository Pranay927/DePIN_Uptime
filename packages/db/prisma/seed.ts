
import { prisma } from "../src";

const USER_ID = "1";

async function seed() {


    const website = await prisma.website.findFirst({
       where:{
        url:"HaraBara.com"
       }
    })
    if(!website) return;

    const validator = await prisma.validator.create({
        data: {
            publicKey: "0x12341223123",
            location: "Delhi",
            ip: "127.0.0.1",
        }
    })

   

    let currentTime = new Date();

    // Create 10 website ticks alternating status (Red-Green)
    for (let i = 0; i < 10; i++) {
        await prisma.websiteTick.create({
            data: {
                websiteId: website.id,
                status: i < 5 ? "Good" : "Bad",  // First 5 Green, Last 5 Red
                latency: 100,
                validatorId: validator.id,
                createdAt: new Date(currentTime.getTime() - i * 3 * 60 * 1000) // Decreasing 3 min each
            }
        });
    }

}

seed();