import * as dotenv from "dotenv";

// Load env before importing prisma
dotenv.config({ path: ".env.local" });
dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("../app/generated/prisma/client");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaPg } = require("@prisma/adapter-pg");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { seedCustomers } = require("../lib/seed-data");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing customers
  await prisma.customer.deleteMany();
  console.log("  ✓ Cleared existing customers");

  // Insert all 50 fake customers
  const created = await prisma.customer.createMany({
    data: seedCustomers.map(
      (c: {
        name: string;
        email: string;
        company: string;
        plan: string;
        mrr: number;
        status: string;
        joinedAt: Date;
      }) => ({
        name: c.name,
        email: c.email,
        company: c.company,
        plan: c.plan,
        mrr: c.mrr,
        status: c.status,
        joinedAt: c.joinedAt,
      })
    ),
  });

  console.log(`  ✓ Inserted ${created.count} customers`);
  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
