import { business } from '../data/services.js'

export default function Contact() {
  const mapQuery = encodeURIComponent('Sultana Chirawa Jhunjhunu Rajasthan 333028')
  return (
    <section id="contact" className="sec">
      <div className="container">
        <div className="sec-head reveal">
          <span className="sec-eyebrow">संपर्क करें</span>
          <h2>हमसे जुड़ें</h2>
          <p>किसी भी सेवा या जानकारी के लिए कॉल करें, WhatsApp करें या केंद्र पर आएँ।</p>
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-lg-6">
            <div className="contact-card reveal">
              <div className="contact-row">
                <span className="contact-ic">👤</span>
                <div>
                  <div className="c-label">संचालक / Owner</div>
                  <div className="c-val">{business.owner}</div>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-ic">📞</span>
                <div>
                  <div className="c-label">कॉल / WhatsApp</div>
                  <div className="c-val">
                    <a href={`tel:${business.phone}`}>{business.phone}</a>{' · '}
                    <a href={`https://wa.me/${business.phoneIntl}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  </div>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-ic">✉️</span>
                <div>
                  <div className="c-label">ईमेल / Email</div>
                  <div className="c-val"><a href={`mailto:${business.email}`}>{business.email}</a></div>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-ic">📍</span>
                <div>
                  <div className="c-label">पता / Address</div>
                  <div className="c-val">{business.address}</div>
                </div>
              </div>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <a className="btn btn-indigo" href={`tel:${business.phone}`}>अभी कॉल करें</a>
                <a className="btn btn-whatsapp" href={`https://wa.me/${business.phoneIntl}`} target="_blank" rel="noopener noreferrer">WhatsApp करें</a>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="map-wrap reveal">
              <iframe
                title="AAMNA Computer and E-Mitra location"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
