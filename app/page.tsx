import { LandingPage } from "@/components/landing/landing-page";
import { BlogsSection } from "@/components/landing/blogs-section";

export default function Home() {
  return <LandingPage blogsSection={<BlogsSection />} />;
}
