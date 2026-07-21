import { db } from "@/lib/db";
import { getContentMap } from "@/actions/content";
import Hero from '../sections/Hero';
import Collections from '../sections/Collections';
import ProductCategories from '../sections/ProductCategories';
import BrandStory from '../sections/BrandStory';
import Testimonials from '../sections/Testimonials';
import CTABanner from '../sections/CTABanner';

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContentMap();

  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 8 // Featured products limit
  });

  const testimonials = await db.testimonial.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <>
      <Hero 
        heading={content.hero_heading}
        subtext={content.hero_subtext}
        image={content.hero_image}
        ctaText={content.hero_cta_text}
        ctaLink={content.hero_cta_link}
      />
      
      <Collections 
        products={products}
        heading={content.collections_heading}
        subheading={content.collections_subheading}
      />
      
      <ProductCategories />
      
      <BrandStory 
        heading={content.brand_story_heading}
        text={content.brand_story_text}
        image={content.brand_story_image}
      />
      
      <Testimonials testimonials={testimonials} />
      
      <CTABanner 
        heading={content.cta_heading}
        subtext={content.cta_subtext}
        buttonText={content.cta_button_text}
        whatsappLink={content.cta_whatsapp_link}
      />
    </>
  );
}
