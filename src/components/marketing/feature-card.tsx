
interface Props {
    icon: React.ComponentType<{ size?: number }>
    title: string
    desc: string
}

export default function FeatureCard({
    icon: Icon, title, desc
}: Props) {
    return (
        <div className="flex flex-col items-start gap-4 p-6 bg-background rounded-xl border">
            <Icon size={28} />
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
    )
}