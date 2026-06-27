# A.U.C. Water Purifier — Website

A simple, responsive one-page website for **A.U.C. Water Purifier** (Mankhurd, Mumbai),
built with HTML, CSS, JavaScript and Bootstrap 5.

> Pure · Healthy · Refreshing — all type of purifier services.

## Features

- Water-themed hero with animated waves and a floating droplet
- Filter types section (UF+UV, RO+UF+UV, RO+UF+UF+TDS+Alkaline, Zinc+Copper)
- Special offers (free installation + kit, 1 year free service, 1 year filter warranty)
- **"Which purifier is right for you?"** interactive finder (vanilla JS)
- Product range and contact section with embedded map
- Click-to-call, WhatsApp links and a floating WhatsApp button
- Responsive down to mobile, keyboard focus and reduced-motion support

## Project structure

```
auc-water-purifier/
├── index.html        # markup / all sections
├── css/
│   └── style.css     # custom water-themed styles
├── js/
│   └── script.js     # finder logic, scroll reveal, helpers
└── README.md
```

Bootstrap and Google Fonts are loaded via CDN, so no build step is required.

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

## Contact (business)

- **Owner:** Manzoor Chauhan
- **Call:** 8741878134
- **WhatsApp:** 7073107358
- **Address:** Building No. 19, Room No. 310, Near Metro Station, Maharashtra Nagar, Mankhurd (E), Mumbai – 400043

## Deploy

This is a static site — host it free on GitHub Pages, Netlify or Vercel.
For GitHub Pages: push to a repo, then enable Pages on the `main` branch (root).
