import dynamic from 'next/dynamic'
import Header from '../components/Header'
import Hero from '../components/Hero'
import WhyChoose from '../components/WhyChoose'
import PrintingCapabilities from '../components/PrintingCapabilities'
import HowItWorks from '../components/HowItWorks'
import SmartPackaging from '../components/SmartPackaging'
import Sustainability from '../components/Sustainability'
import QuoteForm from '../components/QuoteForm'
import Footer from '../components/Footer'

// Lazy load heavy components
const ProductShowcase = dynamic(() => import('../components/ProductShowcase'), {
  loading: () => (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading products...</p>
      </div>
    </section>
  ),
  ssr: false
})

const IndustryShowcase = dynamic(() => import('../components/IndustryShowcase'), {
  loading: () => (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading industry solutions...</p>
      </div>
    </section>
  ),
  ssr: false
})

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <ProductShowcase />
      <WhyChoose />
      <PrintingCapabilities />
      <HowItWorks />
      <SmartPackaging />
      <IndustryShowcase />
      <Sustainability />
      <QuoteForm />
      <Footer />
    </main>
  )
}