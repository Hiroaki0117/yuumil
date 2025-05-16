import { Heart, Sparkles, TrendingUp } from "lucide-react";
import FeatureCard from "./feature-card";

const FEATURES = [
{ icon: Sparkles, title: '24h 新着', desc: '最新動画だけを自動収集' },
{ icon: TrendingUp, title: 'トレンド分析', desc: 'AI が急上昇を検出' },
{ icon: Heart, title: '好みフィード', desc: 'ジャンル/キーワード定義は 3 クリック' },
];

export default function Feature() {

    return(
        <section className="py-20 bg-muted/40">
            <div className="container grid lg:grid-cols-3 gap-8 px-6">
                {FEATURES.map((f) => (
                    <FeatureCard key={f.title} {...f} />
                ))}
            </div>
        </section>
    );
};