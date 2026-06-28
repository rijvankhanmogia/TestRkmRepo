import { business } from '../data/services.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-5">
            <div className="f-brand">AAMNA Computer & E-Mitra</div>
            <p className="mt-2 mb-0">सेवा आपके द्वार — सरल, तेज़ और भरोसेमंद।</p>
            <p className="mb-0" style={{ fontSize: '.9rem' }}>संचालक: {business.owner}</p>
          </div>
          <div className="col-md-3">
            <h4 style={{ color: '#fff', fontSize: '1rem' }}>त्वरित लिंक</h4>
            <p className="mb-1"><a href="#services">सेवाएँ</a></p>
            <p className="mb-1"><a href="#enquiry">पूछताछ</a></p>
            <p className="mb-1"><a href="#contact">संपर्क</a></p>
          </div>
          <div className="col-md-4">
            <h4 style={{ color: '#fff', fontSize: '1rem' }}>संपर्क</h4>
            <p className="mb-1"><a href={`tel:${business.phone}`}>📞 {business.phone}</a></p>
            <p className="mb-1"><a href={`mailto:${business.email}`}>✉️ {business.email}</a></p>
            <p className="mb-0" style={{ fontSize: '.88rem' }}>📍 {business.address}</p>
          </div>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} AAMNA Computer and E-Mitra, Sultana (Chirawa), Jhunjhunu, Rajasthan. सर्वाधिकार सुरक्षित।
        </p>
      </div>
    </footer>
  )
}
