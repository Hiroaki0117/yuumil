import Feature from "@/components/marketing/feature";
import FinalCta from "@/components/marketing/final-cta";
import Hero from "@/components/marketing/hero";
import HowItWorks from "@/components/marketing/how-it-works";
import SocialProof from "@/components/marketing/social-proof";

export default function MarketingPage() {
    return (
        <>
            <Hero />
            <Feature />
            <HowItWorks />
            <SocialProof />
            <FinalCta />
        </>
    );
}