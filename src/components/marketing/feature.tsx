import { Heart, Sparkles, TrendingUp } from "lucide-react";

const FEATURES = [
{ icon: Sparkles, title: '24h 新着', desc: '最新動画だけを自動収集' },
{ icon: TrendingUp, title: 'トレンド分析', desc: 'AI が急上昇を検出' },
{ icon: Heart, title: '好みフィード', desc: 'ジャンル/キーワード定義は 3 クリック' },
];

export default function Feature() {
    return(
        <section className="relative py-32 bg-white overflow-hidden">
            {/* Luxury background gradient */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
                {/* Subtle geometric pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23000'%3e%3cpath d='m0 0 32 32'/%3e%3c/svg%3e")`
                }} />
            </div>
            
            {/* Premium container with bento grid layout */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100 mb-6">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                        Core Features
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        パーソナライズされた
                        <span className="text-blue-600 block">動画発見体験</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        AIが分析する最新トレンドと、あなたの興味に基づいた
                        <br className="hidden sm:block" />
                        完全にカスタマイズされた動画フィードを提供
                    </p>
                </div>
                
                {/* Bento grid layout for features */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {FEATURES.map((feature, index) => (
                        <div key={feature.title} className={`relative group ${index === 1 ? 'lg:col-span-1' : ''}`}>
                            {/* Glassmorphism container */}
                            <div className="relative h-full bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                {/* Feature content */}
                                <div className="relative z-10">
                                    {/* Icon with premium styling */}
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    
                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        {feature.title}
                                    </h3>
                                    
                                    {/* Description */}
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {feature.desc}
                                    </p>
                                    
                                    {/* Premium accent line */}
                                    <div className="mt-6 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full group-hover:w-24 transition-all duration-300" />
                                </div>
                                
                                {/* Floating decoration */}
                                <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Bottom call-to-action */}
                <div className="text-center mt-16">
                    <p className="text-gray-600 mb-6 text-lg">
                        すべての機能を無料でお試しください
                    </p>
                    <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <span className="relative z-10">機能を詳しく見る</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </div>
            </div>
        </section>
    );
}