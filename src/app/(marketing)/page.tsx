import { HeroEnhanced } from "@/components/marketing/hero-enhanced";
import { FeatureShowcase } from "@/components/marketing/feature-showcase";
import { StatsShowcase } from "@/components/marketing/stats-showcase";
import { TestimonialsEnhanced } from "@/components/marketing/testimonials-enhanced";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FAQSection } from "@/components/marketing/faq-section";
import { FinalCTAEnhanced } from "@/components/marketing/final-cta-enhanced";

export default function MarketingPage() {
    return (
        <>
            <HeroEnhanced />
            <FeatureShowcase />
            <StatsShowcase />
            <TestimonialsEnhanced />
            <PricingSection />
            <FAQSection />
            <FinalCTAEnhanced />
        </>
    );
}