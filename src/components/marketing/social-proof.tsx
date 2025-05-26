'use client'

const testimonials = [
  { 
    name: 'Kyoko S.', 
    role: 'Content Creator',
    text: '朝の通勤中に、トレンドだけさっと見れて便利！時間効率が格段に上がりました。',
    rating: 5
  },
  { 
    name: 'Daichi M.', 
    role: 'Marketing Manager',
    text: '案件リサーチが半分の時間で終わるようになった。AI分析の精度に驚いています。',
    rating: 5
  },
  { 
    name: 'Mina K.', 
    role: 'Video Editor',
    text: '好きなジャンルの新着を逃さないのが最高。インスピレーション源として重宝してます。',
    rating: 5
  },
];

const stats = [
  { value: '10,000+', label: 'Active Users' },
  { value: '95%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Real-time Updates' },
];

export default function SocialProof() {
    return (
        <section className="relative py-32 bg-white overflow-hidden">
            {/* Premium background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23000' fill-opacity='1'%3e%3cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`
                }} />
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100 mb-6">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                        Customer Stories
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        ユーザーが語る
                        <span className="text-blue-600 block">リアルな体験</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        実際にYuumilを使用している方々からの
                        <br className="hidden sm:block" />
                        生の声をお聞きください
                    </p>
                </div>
                
                {/* Stats section */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50 group-hover:shadow-xl transition-all duration-300">
                                <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Testimonials grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="group">
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100/50 group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                <div className="relative z-10">
                                    {/* Rating stars */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <div key={i} className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs">★</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Quote */}
                                    <blockquote className="text-gray-700 text-lg leading-relaxed mb-8">
                                        "{testimonial.text}"
                                    </blockquote>
                                    
                                    {/* Author info */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">
                                                {testimonial.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-gray-500 text-sm">
                                                {testimonial.role}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Decorative quote mark */}
                                <div className="absolute top-6 right-6 text-6xl text-blue-100 font-serif leading-none">
                                    "
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Trust badges */}
                <div className="text-center mt-20">
                    <p className="text-gray-500 mb-8 text-lg">
                        信頼いただいている企業・組織
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                        {['Tech Corp', 'Media Lab', 'Creative Studio', 'Digital Agency'].map((company, index) => (
                            <div key={index} className="px-6 py-3 bg-gray-100 rounded-lg text-gray-600 font-medium">
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}