import Image from 'next/image';

const steps = [
  { 
    num: 1, 
    label: '好みを選択', 
    img: '/images/step1.svg',
    description: 'ジャンルやキーワードを選んでパーソナライズ'
  },
  { 
    num: 2, 
    label: '24h 自動収集', 
    img: '/images/step2.svg',
    description: '最新の動画を自動で収集・分析'
  },
  { 
    num: 3, 
    label: 'フィードで確認', 
    img: '/images/step3.svg',
    description: 'あなた専用のフィードで視聴'
  },
];

export default function HowItWorks() {
    return(
        <section className="relative py-32 bg-gray-50 overflow-hidden">
            {/* Premium background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
                {/* Subtle luxury pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill-rule='evenodd'%3e%3cg fill='%23000' fill-opacity='1'%3e%3cpath d='M0 0h50v50H0V0zm50 50h50v50H50V50z' opacity='0.5'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`
                }} />
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Premium section header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100 mb-6">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                        How It Works
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        シンプルな
                        <span className="text-blue-600 block">3ステップ</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        直感的なインターフェースで、数分で設定完了。
                        <br className="hidden sm:block" />
                        すぐにパーソナライズされた動画体験を開始できます。
                    </p>
                </div>
                
                {/* Bento-style steps grid */}
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step, index) => (
                        <div key={step.num} className="relative group">
                            {/* Connection flow (desktop only) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-20 left-full w-12 h-px bg-gradient-to-r from-blue-300 to-purple-300 z-0">
                                    <div className="absolute right-0 top-[-2px] w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                    <div className="absolute right-2 top-[-1px] w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                                </div>
                            )}
                            
                            {/* Premium step card */}
                            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-gray-100/50 group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                {/* Luxury gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                {/* Step content */}
                                <div className="relative z-10 text-center">
                                    {/* Premium step number */}
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-xl rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                                        {step.num}
                                    </div>
                                    
                                    {/* Step image container */}
                                    <div className="relative w-40 h-40 mx-auto mb-8 group-hover:scale-105 transition-transform duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl opacity-20"></div>
                                        <Image
                                            src={step.img}
                                            alt={`Step ${step.num}: ${step.label}`}
                                            fill
                                            className="object-contain p-6"
                                            priority={index === 0}
                                        />
                                    </div>
                                    
                                    {/* Step title */}
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        {step.label}
                                    </h3>
                                    
                                    {/* Step description */}
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {step.description}
                                    </p>
                                    
                                    {/* Premium accent */}
                                    <div className="mt-6 h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto group-hover:w-24 transition-all duration-300"></div>
                                </div>
                                
                                {/* Floating decorative elements */}
                                <div className="absolute top-6 right-6 w-3 h-3 bg-blue-400 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
                                <div className="absolute bottom-6 left-6 w-2 h-2 bg-purple-400 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Premium CTA section */}
                <div className="text-center mt-20">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-100/50 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            準備はできましたか？
                        </h3>
                        <p className="text-gray-600 mb-8 text-lg">
                            3分で設定完了。今すぐパーソナライズされた動画体験を始めましょう。
                        </p>
                        <button className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <span className="relative z-10">無料で始める</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}