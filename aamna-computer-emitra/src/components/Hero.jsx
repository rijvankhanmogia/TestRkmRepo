import { business } from '../data/services.js'

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <header id="home" className="hero">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <span className="hero-eyebrow">सरकारी अधिकृत E-Mitra केंद्र · Sultana, Rajasthan</span>
            <h1 className="hero-title">
              हर सरकारी सेवा,<br /><span className="accent">एक ही छत के नीचे</span>
            </h1>
            <p className="hero-tagline">सेवा आपके द्वार — सरल, तेज़ और भरोसेमंद।</p>
            <p className="hero-tagline-en">Every government service, simplified — right here in your town.</p>

            <div className="hero-actions">
              <button className="btn btn-marigold" onClick={() => scrollTo('enquiry')}>
                अभी पूछताछ करें
              </button>
              <a
                className="btn btn-whatsapp"
                href={`https://wa.me/${business.phoneIntl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp पर बात करें
              </a>
            </div>

            <div className="hero-trust">
              <div><b>50+</b> सेवाएँ उपलब्ध</div>
              <div><b>एक ही जगह</b> सभी काम</div>
              <div><b>तुरंत</b> सहायता</div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="chip-cloud" aria-hidden="true">
              <div className="chip-core"><span>e-Mitra<br />सेवा केंद्र</span></div>
              <span className="chip c1"><i>📄</i>जन्म प्रमाण</span>
              <span className="chip c2"><i>🪪</i>PAN कार्ड</span>
              <span className="chip c3"><i>💡</i>बिजली बिल</span>
              <span className="chip c4"><i>🍚</i>राशन कार्ड</span>
              <span className="chip c5"><i>🤝</i>पेंशन</span>
              <span className="chip c6"><i>🎫</i>टिकट बुकिंग</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
