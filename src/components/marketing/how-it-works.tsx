const steps = [
  { num: 1, label: '好みを選択', img: '/images/step1.svg' },
  { num: 2, label: '24h 自動収集', img: '/images/step2.svg' },
  { num: 3, label: 'フィードで確認', img: '/images/step3.svg' },
];

export default function HowItWorks() {
    return(
        <section className="container py-20 px-6">
            <h2 className="text-3xl lg:text-4xl text-center font-bold mb-12">
                使い方は3ステップ
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
                {steps.map((s) => (
                    <div key={s.num} className="flex flex-col items-center gap-4">
                        <img src = {s.img} alt="steps" className="h-32"></img>
                        <span className="text-lg font-semibold">{s.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}