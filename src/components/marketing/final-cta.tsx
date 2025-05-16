import { SignInButton } from "@clerk/nextjs";

export default function FinalCta() {
    return (
        <section className="container py-24 bg-primary text-white text-center">
            <h2 className="text-3xl lg:4xl font-bold mb-6">
                今すぐ無料で始めよう
            </h2>
            <SignInButton mode="modal">
                <button className="btn bg-white text-primary hover:bg-white/50">
                    サインアップ
                </button>
            </SignInButton>
        </section>
    );
}