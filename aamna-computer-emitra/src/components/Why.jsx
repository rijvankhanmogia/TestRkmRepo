const points = [
  { n: '१', h: 'एक ही जगह सब कुछ', p: 'अलग-अलग दफ्तरों के चक्कर नहीं — सभी सरकारी काम यहीं पूरे करें।' },
  { n: '२', h: 'भरोसेमंद एवं अधिकृत', p: 'अनुभवी संचालन और सटीक दस्तावेज़ कार्य, हर बार सही जानकारी के साथ।' },
  { n: '३', h: 'तेज़ सेवा', p: 'आवेदन, भुगतान और रिचार्ज — कम समय में, बिना झंझट के।' },
  { n: '४', h: 'WhatsApp सहायता', p: 'घर बैठे पूछताछ करें और अपने काम की जानकारी तुरंत पाएँ।' },
]

export default function Why() {
  return (
    <section id="why" className="sec">
      <div className="container">
        <div className="sec-head reveal">
          <span className="sec-eyebrow">क्यों चुनें हमें</span>
          <h2>आपके भरोसे का सेवा केंद्र</h2>
        </div>
        <div className="row g-4">
          {points.map((p) => (
            <div className="col-md-6 col-lg-3" key={p.n}>
              <div className="why-card reveal">
                <div className="why-num">{p.n}</div>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
