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
import { DataProvider } from '../contexts/DataContext'

// Lazy load heavy components with optimized loading states
const ProductShowcase = dynamic(() => import('../components/ProductShowcase'), {
  loading: () => (
    <section className="min-h-[400px] flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-gray-600 text-sm">Loading products...</p>
      </div>
    </section>
  ),
  ssr: false
})

const IndustryShowcase = dynamic(() => import('../components/IndustryShowcase'), {
  loading: () => (
    <section className="min-h-[400px] flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-gray-600 text-sm">Loading industry solutions...</p>
      </div>
    </section>
  ),
  ssr: false
})

// Server-side data fetching for optimal performance
async function getServerSideData() {
  try {
    // Use Vercel URL in production, localhost in development
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    // Always try to fetch data in both development and production
    const [productsResponse, imagesResponse] = await Promise.all([
      fetch(`${baseUrl}/api/products`, { 
        next: { revalidate: 3600 } // Cache for 1 hour
      }),
      fetch(`${baseUrl}/api/images`, { 
        next: { revalidate: 3600 } // Cache for 1 hour
      })
    ])

    let products = []
    let industryProducts = []
    let images = []

    if (productsResponse.ok) {
      const productsData = await productsResponse.json()
      products = productsData.products || []
      industryProducts = productsData.industryProducts || []
    }

    if (imagesResponse.ok) {
      const imagesData = await imagesResponse.json()
      images = imagesData.images || []
    }

    return { products, industryProducts, images }
  } catch (error) {
    console.error('Error fetching server-side data:', error)
    // Fallback: return empty arrays and let client-side fetch handle it
    return { products: [], industryProducts: [], images: [] }
  }
}

export default async function Home() {
  // Fetch data on the server side for faster initial load
  const { products, industryProducts, images } = await getServerSideData()

  return (
    <DataProvider initialProducts={products} initialIndustryProducts={industryProducts} initialImages={images}>
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
    </DataProvider>
  )
}