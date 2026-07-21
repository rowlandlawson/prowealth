import { getTestimonials } from "@/actions/testimonials";
import TestimonialsClient from "./TestimonialsClient";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return <TestimonialsClient initialTestimonials={testimonials} />;
}
