export const ContainerButtonsHero = () => {
    return (
        <div className="btn-container flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-lg mx-auto">
            <a href="/login" className="glow-button bg-amber-500 text-black px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform w-full md:w-auto whitespace-nowrap">
                Acessar Plataforma
            </a>
            <a href="/planos" className="glass border border-white/10 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition w-full md:w-auto whitespace-nowrap">
                Ver Planos
            </a>
        </div>
    )
}