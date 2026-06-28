import { services } from '../data/services.js'

export default function Services() {
  return (
    <section id="services" className="sec sec-paper">
      <div className="container">
        <div className="sec-head reveal">
          <span className="sec-eyebrow">हमारी सेवाएँ</span>
          <h2>मुख्य सेवाओं की सूची</h2>
          <p>प्रमाण पत्र से लेकर बिल भुगतान, पेंशन और टिकट बुकिंग तक — सब कुछ एक ही जगह।</p>
        </div>

        <div className="row g-4">
          {services.map((s) => (
            <div className="col-md-6 col-lg-4" key={s.id}>
              <div className="svc-card reveal">
                <div className="svc-icon">{s.icon}</div>
                <span className="svc-en">{s.titleEn}</span>
                <h3>{s.title}</h3>
                <ul className="svc-list">
                  {s.items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
