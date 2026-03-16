export const PriorityStep = ({ number, title, description }) => {
    return (
        <div className="flex gap-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                {number}
            </div>
            <div>
                <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
                <p className="text-gray-400">{description}</p>
            </div>
        </div>
    );
};