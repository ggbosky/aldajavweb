import Hero from '@/components/sections/Hero';
import StatsStrip from '@/components/sections/StatsStrip';
import AboutSection from '@/components/sections/AboutSection';
import ClientsSection from '@/components/sections/ClientsSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Page(): React.JSX.Element {
  return (
    <main className="page">
      <Hero />
      <StatsStrip />
      <AboutSection />
      <ClientsSection />
      <ReviewsSection />
      <ContactSection />
    </main>
  );
}
