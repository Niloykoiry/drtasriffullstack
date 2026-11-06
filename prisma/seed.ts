import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config({ path: ".env.local" });
config();

const db = new PrismaClient();

async function seed() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (email) {
    await db.adminUser.upsert({
      where: { email },
      create: { email, isActive: true },
      update: { isActive: true },
    });
  }

  await db.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      content: {
        websiteName: "Dr. Tasrif Ahmed",
        professionalTitle: "Oral & Maxillofacial Surgeon",
        phone: "+8801716-200358",
        email: "dr.tasrif@gmail.com",
        address: "196 Green Road, Dhaka, Bangladesh, Dhaka-1205",
      },
    },
    update: {},
  });

  if (!email) {
    console.log(
      "Site settings seeded; administrator provisioning awaits ADMIN_EMAIL.",
    );
  }
}

seed()
  .catch((error: unknown) => {
    console.error("CMS seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
