import {
    BiLink,
    BiLineChart,
    BiTargetLock
} from 'react-icons/bi';
import { CardDestaqueParceria } from '../CardDestaqueParceria';

export const ContainerParceriaCF = ({barsVisible}) => {
    return (
        <section id="easywallet" className="py-24 px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2 reveal-left">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500 flex items-center justify-center">
                            <BiLink className="text-xl leading-none" />
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Parceria Exclusiva</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-white">
                        Gestão Financeira<br /><span className="gradient-text">com EasyWallet.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        O StudioHub vai além da agenda. Integramos nativamente com o <strong>EasyWallet</strong>, a
                        plataforma de finanças desenhada para o empresário moderno. Cada agendamento concluído alimenta
                        automaticamente sua receita.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        <CardDestaqueParceria Logo={BiLineChart} title="Receita Real" subtitle="Acompanhamento do ticket médio por profissional."/>
                        <CardDestaqueParceria Logo={BiTargetLock} title="Metas Ativas" subtitle="Defina objetivos mensais e acompanhe o progresso."/>
                    </div>
                </div>

                {/* Gráfico/Dashboard Simulados */}
                <div className="lg:w-1/2 w-full reveal-right">
                    <div className="wallet-card p-8 rounded-[3rem] shadow-2xl">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Dashboard Financeiro</p>
                                <h4 className="text-2xl font-black text-white">Receita Mensal</h4>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">+24% este mês</span>
                            </div>
                        </div>

                        {/* Simulação de Gráfico de Barras via React State */}
                        <div className="flex items-end justify-between h-40 gap-3 mb-8">
                            <div className="flex flex-col justify-end items-center flex-1 h-full gap-2">
                                <div className="chart-bar" style={{ height: barsVisible ? '40%' : '0%' }}></div>
                                <span className="text-[9px] text-gray-600 font-bold uppercase">Jan</span>
                            </div>
                            <div className="flex flex-col justify-end items-center flex-1 h-full gap-2">
                                <div className="chart-bar" style={{ height: barsVisible ? '65%' : '0%' }}></div>
                                <span className="text-[9px] text-gray-600 font-bold uppercase">Fev</span>
                            </div>
                            <div className="flex flex-col justify-end items-center flex-1 h-full gap-2">
                                <div className="chart-bar" style={{ height: barsVisible ? '55%' : '0%' }}></div>
                                <span className="text-[9px] text-gray-600 font-bold uppercase">Mar</span>
                            </div>
                            <div className="flex flex-col justify-end items-center flex-1 h-full gap-2">
                                <div className="chart-bar" style={{ height: barsVisible ? '85%' : '0%' }}></div>
                                <span className="text-[9px] text-gray-600 font-bold uppercase">Abr</span>
                            </div>
                            <div className="flex flex-col justify-end items-center flex-1 h-full gap-2">
                                <div className="chart-bar" style={{ height: barsVisible ? '95%' : '0%' }}></div>
                                <span className="text-[9px] text-amber-500 font-black uppercase">Mai</span>
                            </div>
                        </div>

                        {/* Métricas de Rodapé */}
                        <div className="flex gap-4 items-center p-5 bg-white/5 rounded-3xl border border-white/5">
                            <div className="relative w-14 h-14 shrink-0">
                                <svg className="progress-ring w-full h-full" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8"></circle>
                                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="#d4af37" strokeWidth="8"
                                        strokeDasharray="282.7" strokeDashoffset={barsVisible ? "70" : "282.7"} strokeLinecap="round" className="transition-all duration-[1.5s] ease-out"></circle>
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">75%</span>
                            </div>
                            <div>
                                <h6 className="text-sm font-bold text-white mb-0">Meta de Faturamento</h6>
                                <p className="text-xs text-gray-500 mt-0">R$ 12.450,00 de R$ 16.000,00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}