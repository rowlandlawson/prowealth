import { db as prisma } from '../src/lib/db';
import bcrypt from 'bcryptjs';
import { products } from '../src/data/products';

async function main() {
  console.log("Cleaning up database...");
  await prisma.product.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.siteContent.deleteMany({});
  await prisma.user.deleteMany({}); // Note: Model is User, not AdminUser

  console.log("Creating admin user...");
  const hashedPassword = await bcrypt.hash("admin@123", 10);
  await prisma.user.create({
    data: {
      email: "admin@prowealth.com",
      password: hashedPassword,
    },
  });

  console.log("Seeding products...");
  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        image: p.image,
        imagePublicId: p.image || "",
        details: p.details || [],
      },
    });
  }

  console.log("Seeding testimonials...");
  await prisma.testimonial.createMany({
    data: [
      {
        authorName: "Ada M.",
        location: "Port Harcourt",
        rating: 5,
        content: "I've been buying from Prowealth for over a year. The quality is unmatched and the prices are so affordable. Their bubu gowns always get me compliments!",
      },
      {
        authorName: "Chioma O.",
        location: "Lagos",
        rating: 5,
        content: "As a student, I thought luxury fashion was out of reach. Prowealth proved me wrong. I look expensive without spending a fortune.",
      },
      {
        authorName: "Nneka E.",
        location: "Abuja",
        rating: 5,
        content: "I ordered perfumes and a bag. They arrived the next day in perfect condition. The scent lasts all day people always ask what I'm wearing!",
      },
    ]
  });

  console.log("Seeding site content defaults...");
  const defaultContent = [
    { section: "Hero", key: "hero_heading", value: "Luxury Within Reach" },
    { section: "Hero", key: "hero_subtext", value: "Curated bubu gowns, designer fragrances and statement pieces delivered." },
    { section: "Hero", key: "hero_image", value: "https://res.cloudinary.com/drpwe6wjp/image/upload/v1781541420/ChatGPT_Image_Jun_15_2026_05_21_11_PM_p6adw3.png" },
    { section: "Hero", key: "hero_cta_text", value: "Shop the Collection" },
    { section: "Hero", key: "hero_cta_link", value: "https://wa.me/2349046319498" },
    { section: "Collections", key: "collections_heading", value: "The Collection" },
    { section: "Collections", key: "collections_subheading", value: "What We Offer" },
    { section: "Brand Story", key: "brand_story_heading", value: "Fashion that speaks confidence" },
    { section: "Brand Story", key: "brand_story_text", value: "Prowealth Fashion House was born from a simple belief: every woman deserves to feel luxurious without breaking the bank. What started as a small passion project in Port Harcourt has grown into a trusted destination for ready-to-wear African fashion. We design and source the finest bubu gowns, dresses, perfumes, shoes, and accessories all curated to make you look and feel your absolute best." },
    { section: "Brand Story", key: "brand_story_image", value: "https://res.cloudinary.com/drpwe6wjp/image/upload/v1781541418/ChatGPT_Image_Jun_15_2026_05_23_17_PM_vayosa.png" },
    { section: "CTA Banner", key: "cta_heading", value: "Your next favourite\noutfit is one message away." },
    { section: "CTA Banner", key: "cta_subtext", value: "Shop our ready-to-wear collection or book a session for professional measurements and custom sewing." },
    { section: "CTA Banner", key: "cta_button_text", value: "Book a Session or Shop" },
    { section: "CTA Banner", key: "cta_whatsapp_link", value: "https://wa.me/2349046319498" },
  ];

  for (const item of defaultContent) {
    await prisma.siteContent.upsert({
      where: { key: item.key },
      update: {},
      create: item,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
