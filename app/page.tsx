import Hero from '@/components/sections/Hero';
import StatsStrip from '@/components/sections/StatsStrip';
import TimelineSection from '@/components/sections/TimelineSection';
import ArsenalSection from '@/components/sections/ArsenalSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Page(): React.JSX.Element {
  return (
    <main className="page">
      <Hero />
      <StatsStrip />
      <TimelineSection />
      <ArsenalSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}
