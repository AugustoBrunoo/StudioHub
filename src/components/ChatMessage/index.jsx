export const ChatMessage = ({ variant = 'received', children, icon }) => {
    // Definimos os estilos baseados em quem enviou a mensagem
    const isSent = variant === 'sent';

    const baseClasses = "p-4 rounded-3xl text-sm";
    const sentClasses = "bg-amber-500 text-black rounded-tr-none ml-12 font-bold shadow-lg";
    const receivedClasses = "bg-white/5 rounded-tl-none mr-12 border border-white/5 leading-relaxed text-gray-200";

    return (
        <div className={`${baseClasses} ${isSent ? sentClasses : receivedClasses} flex items-center gap-3`}>
            {icon && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    {icon}
                </div>
            )}
            <div>{children}</div>
        </div>
    );
};