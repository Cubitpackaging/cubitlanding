import Header from '../components/Header'
import Hero from '../components/Hero'
import WhyChoose from '../components/WhyChoose'
import ProductShowcase from '../components/ProductShowcase'
import HowItWorks from '../components/HowItWorks'
import SmartPackaging from '../components/SmartPackaging'
import IndustryShowcase from '../components/IndustryShowcase'
import Sustainability from '../components/Sustainability'
import QuoteForm from '../components/QuoteForm'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <WhyChoose />
      <ProductShowcase />
      <HowItWorks />
      <SmartPackaging />
      <IndustryShowcase />
      <Sustainability />
      <QuoteForm />
      <Footer />
    </main>
  )
} 