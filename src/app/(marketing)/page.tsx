import Hero from "@/components/marketing/hero";
import Feature from "@/components/marketing/feature";
import HowItWorks from "@/components/marketing/how-it-works";
import SocialProof from "@/components/marketing/social-proof";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FAQSection } from "@/components/marketing/faq-section";
import FinalCta from "@/components/marketing/final-cta";

export default function MarketingPage() {
    return (
        <>
            <Hero />
            <Feature />
            <HowItWorks />
            <SocialProof />
            <PricingSection />
            <FAQSection />
            <FinalCta />
        </>
    );
}