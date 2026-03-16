export const CardDestaqueParceria = ({ Logo, title, subtitle }) => {
    return (
        <div className="p-4 glass rounded-2xl border border-white/5">
            <Logo className="text-amber-500 text-2xl block mb-2" />
            <h5 className="font-bold text-white mb-1">{title}</h5>
            <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
    )
}