import { SignInButton } from "@clerk/nextjs";

export default function FinalCta() {
    return (
        <section className="relative py-24 overflow-hidden bg-[#18192a] w-full">
            {/* より暗いグラデーション */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a1a2b] via-[#1a1b2b] to-[#0e0f1a] opacity-90 w-full" />
                <div className="absolute inset-0 mix-blend-soft-light opacity-30 w-full" style={{backgroundImage:'url(/images/noise.png)'}} />
            </div>
            <div className="relative z-10 w-full max-w-3xl mx-auto text-center px-6">
                <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white/90">
                    今すぐ無料で始めよう
                </h2>
                <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
                    あなたの好みに合わせた動画フィードで、<br />
                    見逃したくないコンテンツをキャッチしましょう。
                </p>
                <SignInButton mode="modal">
                    <button className="relative px-8 py-3 bg-gradient-to-r from-red-500 via-mag-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-[0_0_12px_50%_rgba(225,33,33,0.5)] transition-all">
                        サインアップ
                    </button>
                </SignInButton>
            </div>
        </section>
    );
}