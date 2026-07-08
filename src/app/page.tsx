import Hero from '../sections/Hero';
import Collections from '../sections/Collections';
import ProductCategories from '../sections/ProductCategories';
import BrandStory from '../sections/BrandStory';
import Testimonials from '../sections/Testimonials';
import CTABanner from '../sections/CTABanner';

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <ProductCategories />
      <BrandStory />
      <Testimonials />
      <CTABanner />
    </>
  );
}
