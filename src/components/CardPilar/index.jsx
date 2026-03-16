export const CardPilar = ({Icon, title, caption, paragraph}) => {
    return (
        <div className="pillar-card border border-white/5 bg-white/[0.02] p-10 rounded-[3rem] feature-card-glow">
            <div className="mb-8 w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                <Icon className="text-2xl" />
            </div>
            <h3 className="text-xs uppercase tracking-[0.3em] text-amber-500 font-bold mb-4">{title}</h3>
            <h4 className="text-2xl font-extrabold mb-6 text-white">{caption}</h4>
            <p className="text-gray-400 leading-relaxed">
                {paragraph}
            </p>
        </div>
    )
}