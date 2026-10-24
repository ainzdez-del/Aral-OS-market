import { useEffect, useState } from 'react'
import { Atelier } from './Atelier'
import { BentoCollection } from './BentoCollection'
import { CartDrawer } from './CartDrawer'
import { Checkout } from './Checkout'
import { FabricTech } from './FabricTech'
import { Footer } from './Footer'
import { Header } from './Header'
import { Hero } from './Hero'
import { Lookbook } from './Lookbook'
import { ProfileOverlay, SearchOverlay } from './Overlays'
import { ProductModal } from './ProductModal'
import { CartProvider, useCart } from './CartContext'
import { OrderProvider, useOrders } from './OrderContext'
import type { Look, Product } from './catalog'

export default function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <Store />
      </OrderProvider>
    </CartProvider>
  )
}

function Store() {
  const { open: cartOpen } = useCart()
  const { checkoutOpen } = useOrders()
  const [look, setLook] = useState<Look | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [search, setSearch] = useState(false)
  const [profile, setProfile] = useState(false)

  useEffect(() => {
    if (cartOpen || checkoutOpen) {
      setLook(null)
      setProduct(null)
    }
  }, [cartOpen, checkoutOpen])

  return (
    <div className="min-h-svh bg-[#030303] text-white">
      <Header onSearch={() => setSearch(true)} onProfile={() => setProfile(true)} />
      <main>
        <Hero />
        <BentoCollection onSelect={setProduct} />
        <FabricTech />
        <Lookbook onOpen={setLook} />
        <Atelier />
      </main>
      <Footer />
      <CartDrawer />
      <Checkout />
      <ProductModal
        look={look}
        product={product}
        onClose={() => {
          setLook(null)
          setProduct(null)
        }}
      />
      <SearchOverlay
        open={search}
        onClose={() => setSearch(false)}
        onPick={setProduct}
      />
      <ProfileOverlay open={profile} onClose={() => setProfile(false)} />
    </div>
  )
}
