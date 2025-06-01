import { HeroEnhanced } from "@/components/marketing/hero-enhanced";
import Feature from "@/components/marketing/feature";
import HowItWorks from "@/components/marketing/how-it-works";
import SocialProof from "@/components/marketing/social-proof";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FAQSection } from "@/components/marketing/faq-section";
import FinalCta from "@/components/marketing/final-cta";
import Footer from "@/components/marketing/footer";

export default function MarketingPage() {
    return (
        <>
            <HeroEnhanced />
            <Feature />
            <HowItWorks />
            <SocialProof />
            <PricingSection />
            <FAQSection />
            <FinalCta />
            <Footer />
        </>
    );
}