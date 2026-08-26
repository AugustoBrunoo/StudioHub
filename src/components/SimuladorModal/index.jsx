import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function SimuladorModal({ isOpen, onClose }) {
    const [plano, setPlano] = useState('solo');
    const chatRef = useRef(null);
    const dashRef = useRef(null);
    const modalRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);
    
    // Animate Modal Open/Close
    useEffect(() => {
        if (!modalRef.current) return;
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.to(modalRef.current, { opacity: 1, duration: 0.3, ease: "power2.out", display: 'flex' });
        } else {
            gsap.to(modalRef.current, { 
                opacity: 0, 
                duration: 0.3, 
                ease: "power2.in", 
                onComplete: () => {
                    if (modalRef.current) modalRef.current.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }, [isOpen]);

    function createMessage(text, isBot) {
        const div = document.createElement('div');
        div.className = isBot
            ? "bg-[#202c33] text-[#e9edef] p-3 rounded-xl rounded-tl-sm max-w-[90%] sm:max-w-[85%] text-xs sm:text-sm shadow-sm border-l-2 border-amber-500 self-start"
            : "bg-[#005c4b] text-[#e9edef] p-3 rounded-xl rounded-tr-sm max-w-[90%] sm:max-w-[85%] text-xs sm:text-sm shadow-sm self-end";
        div.innerHTML = text + `<span class="block text-[9px] sm:text-[10px] text-right opacity-60 mt-1">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
        return div;
    }

    function rolarChat() {
        setTimeout(() => {
            if (chatRef.current) {
                chatRef.current.scrollTo({
                    top: chatRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, 50);
    }

    useEffect(() => {
        if (!isOpen) return;

        let simTimeline = gsap.timeline();
        const chatContainer = chatRef.current;
        const dashContainer = dashRef.current;

        if (!chatContainer || !dashContainer) return;

        chatContainer.innerHTML = '';
        dashContainer.innerHTML = '';
        setIsTyping(false);

        if (plano === 'solo') {
            dashContainer.innerHTML = `
                <div class="z-10 bg-zinc-900 border border-white/5 rounded-2xl p-4 sm:p-6 w-full max-w-md mx-auto">
                    <h4 class="text-white font-bold mb-4 flex items-center justify-between text-sm sm:text-base">
                        Agenda de Hoje
                        <span class="text-[10px] sm:text-xs bg-white/10 px-2 py-1 rounded">1 vaga disponível</span>
                    </h4>
                    <div class="space-y-3">
                        <div class="p-3 bg-white/5 rounded-lg border-l-2 border-gray-500 opacity-50 flex justify-between text-xs sm:text-sm">
                            <span class="text-gray-400">13:00 - Maria S.</span>
                        </div>
                        <div id="slot-vazio" class="p-4 border border-dashed border-white/20 rounded-lg flex items-center justify-center text-xs sm:text-sm text-gray-500 bg-black/20 transition-all duration-500">
                            14:00 - Horário Livre
                        </div>
                        <div class="p-3 bg-white/5 rounded-lg border-l-2 border-gray-500 opacity-50 flex justify-between text-xs sm:text-sm">
                            <span class="text-gray-400">15:00 - Carlos M.</span>
                        </div>
                    </div>
                </div>
            `;

            simTimeline
                .to({}, { duration: 0.5 })
                .call(() => {
                    chatContainer.appendChild(createMessage("Olá! Queria marcar um horário pra hoje à tarde.", false));
                    gsap.from(chatContainer.lastChild, { y: 20, opacity: 0, duration: 0.3 });
                    rolarChat();
                })
                .to({}, { duration: 0.3 })
                .call(() => { setIsTyping(true); rolarChat(); })
                .to({}, { duration: 1.5 })
                .call(() => setIsTyping(false))
                .call(() => {
                    chatContainer.appendChild(createMessage("Olá! Verifiquei a agenda e temos apenas 1 vaga disponível hoje, às <b>14:00</b>. Podemos confirmar?", true));
                    gsap.from(chatContainer.lastChild, { y: 20, opacity: 0, duration: 0.3 });
                    rolarChat();
                })
                .to({}, { duration: 0.3 })
                .to({}, { duration: 1.5 })
                .call(() => {
                    chatContainer.appendChild(createMessage("Sim, pode marcar!", false));
                    gsap.from(chatContainer.lastChild, { y: 20, opacity: 0, duration: 0.3 });
                    rolarChat();
                })
                .to({}, { duration: 0.3 })
                .to({}, { duration: 0.5 })
                .call(() => {
                    const slot = document.getElementById('slot-vazio');
                    if (slot) {
                        slot.className = "p-4 bg-amber-500/20 border border-amber-500 rounded-lg flex justify-between text-xs sm:text-sm text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]";
                        slot.innerHTML = `<span class="font-bold text-amber-500">14:00 - Novo Agendamento</span><i class="bi bi-check-circle-fill text-amber-500"></i>`;
                        gsap.from(slot, { scale: 0.95, opacity: 0.5, duration: 0.4, ease: "back.out(1.7)" });
                    }
                })
                .call(() => { setIsTyping(true); rolarChat(); })
                .to({}, { duration: 1 })
                .call(() => setIsTyping(false))
                .call(() => {
                    chatContainer.appendChild(createMessage("Feito! Seu horário às 14:00 está confirmado. Te enviaremos um lembrete 2h antes. 📅", true));
                    gsap.from(chatContainer.lastChild, { y: 20, opacity: 0, duration: 0.3 });
                    rolarChat();
                })
                .to({}, { duration: 0.3 });
        } else if (plano === 'premium') {
            dashContainer.innerHTML = `
                <div class="z-10 w-full space-y-4 sm:space-y-6">
                    <div class="bg-gradient-to-r from-zinc-900 to-black p-4 sm:p-5 rounded-2xl border border-amber-500/30 flex justify-between items-center w-full max-w-2xl mx-auto shadow-lg">
                        <div>
                            <p class="text-[8px] sm:text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1">EasyWallet Lite</p>
                            <p class="text-xs sm:text-sm text-gray-400">Previsão Faturamento</p>
                        </div>
                        <div class="text-right">
                            <h3 id="wallet-total" class="text-lg sm:text-2xl font-black text-white transition-all duration-500">R$ 1.200,00</h3>
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full h-full pb-4">
                        <div class="flex-1 bg-zinc-900 border border-white/5 rounded-xl p-3 sm:p-4 opacity-50 flex sm:block items-center justify-between sm:justify-start">
                            <div class="sm:border-b border-white/10 sm:pb-2 sm:mb-4"><p class="text-xs text-white font-bold text-center">Dr. Paulo</p></div>
                            <div class="bg-white/5 rounded p-2 text-[10px] sm:text-xs text-gray-500 text-center">10:00 - Ocupado</div>
                        </div>
                        <div class="flex-1 bg-zinc-900 border border-white/10 rounded-xl p-3 sm:p-4 relative flex sm:block items-center justify-between sm:justify-start" id="col-ana">
                            <div class="absolute inset-0 border-2 border-amber-500 rounded-xl opacity-0" id="ana-focus"></div>
                            <div class="sm:border-b border-white/10 sm:pb-2 sm:mb-4"><p class="text-xs text-white font-bold text-center z-10 relative">Dra. Ana</p></div>
                            <div id="slot-ana" class="border border-dashed border-white/20 rounded p-2 text-[10px] sm:text-xs text-gray-500 text-center transition-all duration-500 z-10 relative w-1/2 sm:w-full">
                                10:00 - Livre
                            </div>
                        </div>
                        <div class="flex-1 bg-zinc-900 border border-white/5 rounded-xl p-3 sm:p-4 opacity-50 flex sm:block items-center justify-between sm:justify-start">
                            <div class="sm:border-b border-white/10 sm:pb-2 sm:mb-4"><p class="text-xs text-white font-bold text-center">Dr. Lucas</p></div>
                            <div class="bg-white/5 rounded p-2 text-[10px] sm:text-xs text-gray-500 text-center">10:00 - Ocupado</div>
                        </div>
                    </div>
                </div>
            `;
            simTimeline
                .to({}, { duration: 0.5 })
                .call(() => {
                    chatContainer.appendChild(createMessage("Bom dia, a Dra. Ana tem horário vago hoje de manhã?", false));
                    gsap.from(chatContainer.lastChild, { y: 20, opacity: 0, duration: 0.3 });
                    rolarChat();
                })
                .to({}, { duration: 0.3 })
                .call(() => { setIsTyping(true); rolarChat(); })
                .to("#ana-focus", { opacity: 1, duration: 0.3, yoyo: true, repeat: 3 })
                .call(() => setIsTyping(false))
                .call(() => {
                    chatContainer.appendChild(createMessage("Bom dia! Buscando na agenda da Dra. Ana... Sim, temos uma vaga às <b>10:00</b> (Avaliação - R$ 250,00). Deseja agendar?", true));
                    gsap.from(chatContainer.lastChild, { y: 20, opacity: 0, duration: 0.3 });
                    rolarChat();
                })
                .to({}, { duration: 0.3 })
                .to({}, { duration: 1.5 })
                .call(() => {
                    chatContainer.appendChild(createMessage("Sim, quero essa.", false));
                    gsap.from(chatContainer.lastChild, { y: 20, opacity: 0, duration: 0.3 });
                    rolarChat();
                })
                .to({}, { duration: 0.3 })
                .to({}, { duration: 0.5 })
                .call(() => {
                    const slot = document.getElementById('slot-ana');
                    if(slot) {
                        slot.className = "bg-amber-500 text-black font-bold rounded p-2 text-[10px] sm:text-xs text-center shadow-[0_0_10px_rgba(212,175,55,0.4)] z-10 relative w-1/2 sm:w-full";
                        slot.innerHTML = "10:00 - Nova Avaliação";
                        gsap.from(slot, { scale: 0.5, duration: 0.5, ease: "back.out(2)" });
                    }
                    const wallet = document.getElementById('wallet-total');
                    if(wallet) {
                        gsap.to(wallet, {
                            scale: 1.2, color: '#d4af37', duration: 0.3,
                            onComplete: () => {
                                wallet.innerText = "R$ 1.450,00";
                                gsap.to(wallet, { scale: 1, color: 'white', duration: 0.3, delay: 0.2 });
                            }
                        });
                    }
                })
                .call(() => { setIsTyping(true); rolarChat(); })
                .to({}, { duration: 1 })
                .call(() => setIsTyping(false))
                .call(() => {
                    chatContainer.appendChild(createMessage("Agendado com sucesso! A Dra. Ana te espera às 10:00. ✅", true));
                    gsap.from(chatContainer.lastChild, { y: 20, opacity: 0, duration: 0.3 });
                    rolarChat();
                })
                .to({}, { duration: 0.3 });
        } else if (plano === 'hub') {
            dashContainer.innerHTML = `
                <div class="z-10 w-full max-w-md mx-auto space-y-4 sm:space-y-6">
                    <div class="text-center mb-4 sm:mb-6">
                        <h4 class="text-xl sm:text-2xl font-black text-white">EasyWallet Pro</h4>
                        <p class="text-xs sm:text-sm text-gray-500">Split Inteligente de Pagamentos</p>
                    </div>
                    <div id="hub-payment" class="bg-zinc-800 p-4 sm:p-6 rounded-2xl text-center border border-white/5 opacity-50 scale-95 transition-all duration-500">
                        <p class="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mb-2">Aguardando Pagamento</p>
                        <h2 class="text-2xl sm:text-3xl font-black text-gray-600">R$ 0,00</h2>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <div class="flex justify-between text-xs mb-1">
                                <span class="text-amber-500 font-bold">Clínica (40%)</span>
                                <span class="text-white" id="val-clinica">R$ 0,00</span>
                            </div>
                            <div class="w-full bg-zinc-900 rounded-full h-2 overflow-hidden">
                                <div id="bar-clinica" class="bg-amber-500 h-full w-0"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-xs mb-1">
                                <span class="text-white font-bold">Dr. Paulo (60%)</span>
                                <span class="text-white" id="val-medico">R$ 0,00</span>
                            </div>
                            <div class="w-full bg-zinc-900 rounded-full h-2 overflow-hidden">
                                <div id="bar-medico" class="bg-white h-full w-0"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            simTimeline
                .to({}, { duration: 0.5 })
                .call(() => {
                    chatContainer.appendChild(createMessage("Oi! Queria adiantar o pagamento da minha consulta das 15h.", false));
                    gsap.from(chatContainer.lastChild, { y: 20, opacity: 0, duration: 0.3 });
                    rolarChat();
                })
                .to({}, { duration: 0.3 })
                .call(() => { setIsTyping(true); rolarChat(); })
                .to({}, { duration: 1 })
                .call(() => setIsTyping(false))
                .call(() => {
                    chatContainer.appendChild(createMessage("Claro! O valor da consulta com o Dr. Paulo é R$ 300,00.<br><br>Copie a chave PIX abaixo:<br><code class='bg-black/30 p-1 rounded mt-2 block text-[10px] sm:text-xs'>000.000.000-00</code>", true));
                    gsap.from(chatContainer.lastChild, { y: 20, opacity: 0, duration: 0.3 });
                    rolarChat();
                })
                .to({}, { duration: 0.3 })
                .to({}, { duration: 2 })
                .call(() => {
                    chatContainer.appendChild(createMessage("Pronto, acabei de transferir.", false));
                    gsap.from(chatContainer.lastChild, { y: 20, opacity: 0, duration: 0.3 });
                    rolarChat();
                })
                .to({}, { duration: 0.3 })
                .to({}, { duration: 0.5 })
                .call(() => { setIsTyping(true); rolarChat(); })
                .call(() => {
                    const box = document.getElementById('hub-payment');
                    if(box) {
                        box.className = "bg-green-500/10 p-4 sm:p-6 rounded-2xl text-center border border-green-500/50 scale-100 shadow-[0_0_20px_rgba(34,197,94,0.2)]";
                        box.innerHTML = `
                            <p class="text-[8px] sm:text-[10px] text-green-400 font-bold uppercase tracking-widest mb-2"><i class="bi bi-check2-circle"></i> Pix Identificado</p>
                            <h2 class="text-3xl sm:text-4xl font-black text-white">R$ 300,00</h2>
                        `;
                        gsap.from(box, { y: -20, opacity: 0, duration: 0.5 });
                    }
                })
                .to({}, { duration: 0.8 })
                .call(() => {
                    const box = document.getElementById('hub-payment');
                    if(box) {
                        box.querySelector('p').innerHTML = "<i class='bi bi-diagram-3'></i> Processando Split...";
                        box.querySelector('p').className = "text-[8px] sm:text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-2";
                        box.className = "bg-zinc-900 p-4 sm:p-6 rounded-2xl text-center border border-amber-500/50 scale-100";
                    }
                    gsap.to("#bar-clinica", { width: "40%", duration: 1, ease: "power2.out" });
                    const valClinica = document.getElementById('val-clinica');
                    if (valClinica) valClinica.innerText = "R$ 120,00";

                    gsap.to("#bar-medico", { width: "60%", duration: 1, ease: "power2.out" });
                    const valMedico = document.getElementById('val-medico');
                    if (valMedico) valMedico.innerText = "R$ 180,00";
                })
                .to({}, { duration: 1 })
                .call(() => setIsTyping(false))
                .call(() => {
                    chatContainer.appendChild(createMessage("Pagamento reconhecido e comissionamento processado! Te aguardamos às 15h. 🚀", true));
                    gsap.from(chatContainer.lastChild, { y: 20, opacity: 0, duration: 0.3 });
                    rolarChat();
                })
                .to({}, { duration: 0.3 });
        }

        return () => {
            simTimeline.kill();
        };
    }, [isOpen, plano]);

    return (
        <div ref={modalRef} style={{ display: 'none' }} className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 opacity-0">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[95vh] sm:h-[90vh] max-h-[800px]">
                <div className="p-4 sm:p-6 border-b border-white/5 flex justify-between items-center bg-black/50 z-10 shrink-0">
                    <div>
                        <h3 className="text-lg sm:text-xl font-black flex items-center gap-2">
                            <i className="bi bi-play-circle-fill text-amber-500"></i>
                            Simulador <span className="gradient-text">StudioHub</span>
                        </h3>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                            {plano === 'solo' && "Simulação: Agendamento automático para profissionais autônomos."}
                            {plano === 'premium' && "Simulação: Mediação de horários para até 5 profissionais."}
                            {plano === 'hub' && "Simulação: Divisão automática de pagamento (Split) na clínica."}
                        </p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-xl sm:text-2xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition">
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <div className="flex gap-2 p-3 sm:p-4 overflow-x-auto whitespace-nowrap justify-start sm:justify-center bg-zinc-900 border-b border-white/5 z-10 shrink-0 sim-scroll">
                    <button onClick={() => setPlano('solo')} className={`px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold border transition shrink-0 ${plano === 'solo' ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>Solo</button>
                    <button onClick={() => setPlano('premium')} className={`px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold border transition shrink-0 ${plano === 'premium' ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>Premium</button>
                    <button onClick={() => setPlano('hub')} className={`px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold border transition shrink-0 ${plano === 'hub' ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' : 'border-white/10 text-gray-400 hover:bg-white/5'}`}>Hub Master</button>
                </div>
                <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">
                    <div className="w-full lg:w-1/2 flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-white/5 relative min-h-0">
                        <div className="bg-[#202c33] p-3 sm:p-4 flex items-center gap-3 border-b border-[#2a3942] shrink-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                                <i className="bi bi-robot"></i>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-xs sm:text-sm">StudioHub Bot</h4>
                                <p className="text-[#8696a0] text-[10px] sm:text-xs">Atendimento 24h</p>
                            </div>
                        </div>
                        <div ref={chatRef} className="flex-1 p-4 sm:p-6 overflow-y-auto sim-scroll space-y-4 flex flex-col relative pb-16" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundBlendMode: "overlay", backgroundColor: "rgba(11, 20, 26, 0.9)" }}>
                            {/* Messages appended by GSAP timeline */}
                        </div>
                        <div className={`absolute bottom-[70px] left-4 sm:left-6 z-20 bg-[#202c33] px-4 py-2 rounded-full border border-amber-500/20 text-amber-500 shadow-lg ${isTyping ? 'block' : 'hidden'}`}>
                            <div className="typing-dot"></div>
                            <div className="typing-dot mx-1"></div>
                            <div className="typing-dot"></div>
                        </div>
                        <div className="bg-[#202c33] p-3 sm:p-4 flex gap-2 items-center shrink-0">
                            <div className="text-[#8696a0] text-lg sm:text-xl px-1 sm:px-2"><i className="bi bi-emoji-smile"></i></div>
                            <div className="flex-1 bg-[#2a3942] rounded-lg py-2 px-3 sm:px-4 text-[#8696a0] text-xs sm:text-sm">Mensagem...</div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500 rounded-full flex items-center justify-center text-black shadow-lg"><i className="bi bi-send-fill text-sm sm:text-base"></i></div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 bg-[#0a0a0a] relative flex-1 flex flex-col min-h-0">
                        <div className="p-3 sm:p-4 border-b border-white/5 flex justify-between items-center glass shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="logo-box scale-[0.6] sm:scale-75 shadow-none -ml-2 sm:ml-0"><svg width="14" height="14" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10.5" /></svg></div>
                                <span className="text-xs sm:text-sm font-bold text-white">Dashboard</span>
                            </div>
                            <div className="text-[10px] sm:text-xs text-gray-500">Hoje, 14:00</div>
                        </div>
                        <div ref={dashRef} className="flex-1 p-4 sm:p-8 overflow-y-auto sim-scroll flex flex-col gap-4 sm:gap-6 relative">
                            {/* Dashboard content appended by GSAP timeline */}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0 pointer-events-none">
                            <i className="bi bi-grid-1x2 text-6xl sm:text-9xl text-zinc-800"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
