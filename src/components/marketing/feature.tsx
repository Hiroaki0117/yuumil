import { Heart, Sparkles, TrendingUp } from "lucide-react";
import FeatureCard from "./feature-card";

const FEATURES = [
{ icon: Sparkles, title: '24h 新着', desc: '最新動画だけを自動収集' },
{ icon: TrendingUp, title: 'トレンド分析', desc: 'AI が急上昇を検出' },
{ icon: Heart, title: '好みフィード', desc: 'ジャンル/キーワード定義は 3 クリック' },
];

export default function Feature() {
    return(
        <section className="relative py-20 overflow-hidden bg-[#18192a] w-full">
            {/* より暗いグラデーション */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a1a2b] via-[#1a1b2b] to-[#0e0f1a] opacity-90 w-full" />
                <div className="absolute inset-0 mix-blend-soft-light opacity-30 w-full" style={{backgroundImage:'url(/images/noise.png)'}} />
            </div>
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-8 w-full">
                    {FEATURES.map((f) => (
                        <FeatureCard key={f.title} {...f} />
                    ))}
                </div>
            </div>
        </section>
    );
}