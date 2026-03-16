export const CardFeatures = ({ text, description, icon}) => {
    return (
        <div className="feature-card glass p-8 rounded-3xl reveal border border-white/5 hover:border-amber-500 hover:-translate-y-1">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6 text-amber-500 text-2xl">
                {icon} 
            </div>
            <h3 className="text-xl font-bold mb-4">{text}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    )
}