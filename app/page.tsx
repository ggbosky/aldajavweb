import Hero from '@/components/sections/Hero';
import StatsStrip from '@/components/sections/StatsStrip';
import AboutSection from '@/components/sections/AboutSection';
import WorkSection from '@/components/sections/WorkSection';
import ClientsSection from '@/components/sections/ClientsSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import ContactSection from '@/components/sections/ContactSection';
import { REVIEWS } from '@/lib/site';

export default function Page(): React.JSX.Element {
  return (
    <main className="page">
      <Hero />
      <StatsStrip />
      <AboutSection />
      <WorkSection />
      <ClientsSection />
      {/* No empty box: the section appears as soon as the first review is in. */}
      {REVIEWS.length > 0 && <ReviewsSection />}
      <ContactSection />
    </main>
  );
}
