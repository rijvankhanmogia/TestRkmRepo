import { useState } from 'react'
import { business } from '../data/services.js'

const links = [
  { id: 'services', label: 'सेवाएँ' },
  { id: 'why', label: 'क्यों हम' },
  { id: 'enquiry', label: 'पूछताछ' },
  { id: 'contact', label: 'संपर्क' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const go = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top amn-nav">
      <div className="container">
        <a className="navbar-brand amn-brand" onClick={() => go('home')} role="button">
          <span className="amn-logo">AC</span>
          <span>
            <span className="b-name d-block">AAMNA Computer</span>
            <span className="b-sub">E-Mitra · Sultana</span>
          </span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="मेन्यू"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse${open ? ' show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {links.map((l) => (
              <li className="nav-item" key={l.id}>
                <a className="nav-link" onClick={() => go(l.id)} role="button">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <a className="btn btn-marigold btn-sm" href={`tel:${business.phone}`}>
                📞 कॉल करें
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
