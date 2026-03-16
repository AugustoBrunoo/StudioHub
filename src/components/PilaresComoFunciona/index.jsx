import {
    BiMicrochip,
    BiLogoWhatsapp,
    BiLayout,
} from 'react-icons/bi';
import { CardPilar } from '../CardPilar';

export const PilaresComoFunciona = () => {
    return (
        <section id="ecossistema" className="py-24 px-8 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">

                {/* Pilar 1 */}
                <CardPilar

                    Icon={BiMicrochip}
                    title="1. O Cérebro"
                    caption="Automação via n8n"
                    paragraph="Nosso sistema orquestra lógicas complexas. Ela entende a disponibilidade, gerencia o banco de dados e
                        atua como um mediador humano entre você e o cliente."
                />

                {/* Pilar 2 */}
                <CardPilar

                    Icon={BiLogoWhatsapp}
                    title="2. A Voz"
                    caption="Interface WhatsApp"
                    paragraph="Sem apps complicados. O agendamento ocorre onde o cliente já está, através de um fluxo de conversa
                        natural e catálogo intuitivo de serviços."
                />

                {/* Pilar 3 */}
                <CardPilar

                    Icon={BiLayout}
                    title="3. Os Olhos"
                    caption="Dashboard Admin"
                    paragraph="Visão panorâmica da sua semana. Cancele, ajuste ou adicione agendamentos com um clique e
                        sincronização instantânea em tempo real."
                />
            </div>
        </section>
    )
}