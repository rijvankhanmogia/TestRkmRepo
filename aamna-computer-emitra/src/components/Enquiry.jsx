import { useState } from 'react'
import { services, business } from '../data/services.js'

const empty = { name: '', phone: '', service: '', message: '' }

export default function Enquiry() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState('')

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const err = {}
    if (!form.name.trim()) err.name = 'कृपया अपना नाम लिखें'
    if (!/^[0-9]{10}$/.test(form.phone.trim())) err.phone = '10 अंकों का सही मोबाइल नंबर लिखें'
    if (!form.service) err.service = 'कृपया सेवा चुनें'
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const buildText = () =>
    `*नई पूछताछ — AAMNA Computer & E-Mitra*\n\n` +
    `नाम: ${form.name}\n` +
    `मोबाइल: ${form.phone}\n` +
    `सेवा: ${form.service}\n` +
    `संदेश: ${form.message || '—'}`

  const sendWhatsApp = (e) => {
    e.preventDefault()
    if (!validate()) return
    const url = `https://wa.me/${business.phoneIntl}?text=${encodeURIComponent(buildText())}`
    window.open(url, '_blank', 'noopener')
    setSent('whatsapp')
  }

  const sendEmail = () => {
    if (!validate()) return
    const subject = `पूछताछ: ${form.service} — ${form.name}`
    const body =
      `नाम: ${form.name}\nमोबाइल: ${form.phone}\nसेवा: ${form.service}\n\nसंदेश:\n${form.message || '—'}`
    window.location.href =
      `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent('email')
  }

  return (
    <section id="enquiry" className="sec sec-paper">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-5 reveal">
            <span className="sec-eyebrow">पूछताछ करें</span>
            <h2 style={{ color: 'var(--indigo)', fontWeight: 800, margin: '.35rem 0 .6rem' }}>
              अपना काम बताइए, बाकी हम संभालेंगे
            </h2>
            <p style={{ color: 'var(--muted)' }}>
              नीचे फॉर्म भरें — आपकी पूछताछ सीधे हमारे WhatsApp ({business.phone}) या ईमेल
              ({business.email}) पर पहुँचेगी। हम जल्द ही आपसे संपर्क करेंगे।
            </p>
            <a className="btn btn-whatsapp" href={`https://wa.me/${business.phoneIntl}`} target="_blank" rel="noopener noreferrer">
              सीधे WhatsApp करें
            </a>
          </div>

          <div className="col-lg-7 reveal">
            <form className="enquiry-wrap" onSubmit={sendWhatsApp} noValidate>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">आपका नाम *</label>
                  <input
                    className="form-control" name="name" value={form.name}
                    onChange={update} placeholder="पूरा नाम" />
                  {errors.name && <small style={{ color: '#ffd27a' }}>{errors.name}</small>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">मोबाइल नंबर *</label>
                  <input
                    className="form-control" name="phone" value={form.phone}
                    onChange={update} placeholder="10 अंकों का नंबर" inputMode="numeric" maxLength={10} />
                  {errors.phone && <small style={{ color: '#ffd27a' }}>{errors.phone}</small>}
                </div>
                <div className="col-12">
                  <label className="form-label">सेवा चुनें *</label>
                  <select className="form-select" name="service" value={form.service} onChange={update}>
                    <option value="">— सेवा चुनें —</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>{s.title} ({s.titleEn})</option>
                    ))}
                    <option value="अन्य">अन्य / कुछ और</option>
                  </select>
                  {errors.service && <small style={{ color: '#ffd27a' }}>{errors.service}</small>}
                </div>
                <div className="col-12">
                  <label className="form-label">संदेश (वैकल्पिक)</label>
                  <textarea
                    className="form-control" name="message" rows={3} value={form.message}
                    onChange={update} placeholder="अपनी ज़रूरत के बारे में बताएँ..." />
                </div>
                <div className="col-12 d-flex flex-wrap gap-2">
                  <button type="submit" className="btn btn-whatsapp">WhatsApp पर भेजें</button>
                  <button type="button" className="btn btn-marigold" onClick={sendEmail}>ईमेल से भेजें</button>
                </div>
              </div>

              {sent === 'whatsapp' && (
                <div className="enquiry-success mt-3">
                  ✅ WhatsApp खुल रहा है — कृपया मैसेज भेजकर पूछताछ पूरी करें।
                </div>
              )}
              {sent === 'email' && (
                <div className="enquiry-success mt-3">
                  ✅ ईमेल ऐप खुल रहा है — कृपया मैसेज भेजकर पूछताछ पूरी करें।
                </div>
              )}

              <p className="enquiry-note">
                आपकी जानकारी केवल पूछताछ के लिए उपयोग होती है। यह फॉर्म आपका मैसेज सीधे
                WhatsApp/ईमेल में तैयार कर देता है।
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
