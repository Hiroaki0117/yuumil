import { SignInButton } from "@clerk/nextjs";

export default function FinalCta() {
    return (
        <section className="relative py-32 bg-gray-50 overflow-hidden">
            {/* Premium background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30" />
                {/* Luxury pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23000' fill-opacity='1'%3e%3cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z' opacity='0.5'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`
                }} />
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 right-1/6 w-24 h-24 bg-cyan-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
                {/* Premium CTA container */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-16 shadow-2xl border border-gray-100/50">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100 mb-8">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                        Ready to Start?
                    </div>
                    
                    {/* Main headline */}
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                        今すぐ始めて、
                        <span className="text-blue-600 block">未来の動画体験を</span>
                    </h2>
                    
                    {/* Description */}
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        あなたの好みに完璧に合わせた動画フィードで、
                        <br className="hidden sm:block" />
                        見逃したくないコンテンツを今すぐキャッチしましょう。
                    </p>
                    
                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                        <SignInButton mode="modal">
                            <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg">
                                <span className="relative z-10">無料で始める</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </SignInButton>
                        
                        <button className="px-10 py-5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-lg">
                            デモを見る
                        </button>
                    </div>
                    
                    {/* Value props */}
                    <div className="grid sm:grid-cols-3 gap-8 text-center">
                        <div className="group">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-bold text-xl">✓</span>
                            </div>
                            <div className="text-gray-900 font-medium">無料プラン</div>
                            <div className="text-gray-500 text-sm">クレジットカード不要</div>
                        </div>
                        
                        <div className="group">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-bold text-xl">⚡</span>
                            </div>
                            <div className="text-gray-900 font-medium">3分で設定完了</div>
                            <div className="text-gray-500 text-sm">すぐに利用開始</div>
                        </div>
                        
                        <div className="group">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-bold text-xl">🎯</span>
                            </div>
                            <div className="text-gray-900 font-medium">AIパーソナライズ</div>
                            <div className="text-gray-500 text-sm">あなた専用フィード</div>
                        </div>
                    </div>
                </div>
                
                {/* Trust indicator */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        🔒 安全でセキュアな環境で、10,000人以上のユーザーがご利用中
                    </p>
                </div>
            </div>
        </section>
    );
}