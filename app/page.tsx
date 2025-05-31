
import Header from './components/Header'
import ProductSpotlight from './components/ProductSpotlight'
import FeaturedInsights from './components/FeaturedInsights'



export default function Home() {
  return (
    <div className="min-h-screen">
    
    <Header />
    <ProductSpotlight />
    <FeaturedInsights />
   
  </div>
  )
}