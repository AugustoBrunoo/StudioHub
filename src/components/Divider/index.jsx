export default function Divider() {
    return (
        <div className="w-full flex flex-col items-center justify-center py-10 relative opacity-0" id="divider">
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
            <div className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-amber-500/30 flex items-center justify-center relative z-10 text-amber-500 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                <i className="bi bi-chevron-down text-lg animate-bounce mt-1"></i>
            </div>
        </div>
    );
}
