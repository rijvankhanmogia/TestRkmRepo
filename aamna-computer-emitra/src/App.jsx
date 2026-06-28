import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Why from './components/Why.jsx'
import Enquiry from './components/Enquiry.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { business } from './data/services.js'

export default function App() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('show'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Why />
      <Enquiry />
      <Contact />
      <Footer />
      <a
        className="float-wa"
        href={`https://wa.me/${business.phoneIntl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp पर संपर्क करें"
      >
        💬
      </a>
    </>
  )
}
