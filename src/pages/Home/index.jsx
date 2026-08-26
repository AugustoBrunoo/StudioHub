import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import HowItWorks from '../../components/HowItWorks';
import Differential from '../../components/Differential';
import Faq from '../../components/Faq';
import CallToAction from '../../components/CallToAction';
import Footer from '../../components/Footer';

export default function Home() {
    return (
        <div className="bg-[#0a0a0a] text-[#f5f5f5] font-['Inter'] overflow-x-hidden">
            <Header />
            <Hero />
            <Features />
            <HowItWorks />
            <Differential />
            <Faq />
            <CallToAction />
            <Footer />
        </div>
    );
}
