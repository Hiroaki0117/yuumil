interface Props {
    icon: React.ComponentType<{ size?: number; className?: string }>
    title: string
    desc: string
}

export default function FeatureCard({
    icon: Icon, title, desc
}: Props) {
    return (
        <div className="group flex flex-col items-start gap-6 p-8 bg-[#23243a] rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all shadow-lg w-full">
            <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-500/50 transition-all">
                <Icon size={28} className="text-cyan-500" />
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold text-xl text-white/90">{title}</h3>
                <p className="text-white/80">{desc}</p>
            </div>
        </div>
    )
}