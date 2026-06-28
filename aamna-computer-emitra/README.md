# AAMNA Computer and E-Mitra — Website

Modern, responsive website for **AAMNA Computer and E-Mitra**, Sultana (Chirawa), Jhunjhunu, Rajasthan.
Built with **React + Vite + Bootstrap 5**, with full Hindi (Devanagari) content.

> **Tagline:** सेवा आपके द्वार — सरल, तेज़ और भरोसेमंद। · _Every government service, simplified._

## Features

- Modern indigo + marigold theme with Devanagari fonts (Baloo 2 / Mukta)
- Animated hero with floating service chips
- All 15 service categories from your list, in Hindi (certificates, identity, bills, ration, vehicle, education, banking, agriculture, business, police, pension, tickets, board/recruitment forms, mobile/SIM/recharge, others)
- **Enquiry form** that sends the enquiry straight to your **WhatsApp (9929193099)** or **email (aamnacomputer@gmail.com)** — with form validation
- "Why choose us" section, contact details, embedded map, floating WhatsApp button
- Responsive, keyboard-accessible, reduced-motion friendly

## Tech stack

React 18 · Vite 5 · Bootstrap 5 · vanilla CSS design system

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Build for production:

```bash
npm run build    # output in dist/
npm run preview  # preview the build
```

## Deploy free on GitHub Pages

1. Create a GitHub repo and push this project.
2. In **Settings → Pages**, set **Source = GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes `dist/` automatically on every push to `main`.

`vite.config.js` uses `base: './'`, so it also works on Netlify, Vercel, or any static host.

## How enquiries reach you

The form does **not** need a server. On submit it builds the enquiry text and:
- **WhatsApp पर भेजें** → opens WhatsApp chat to `9929193099` with the message pre-filled.
- **ईमेल से भेजें** → opens the email app addressed to `aamnacomputer@gmail.com`.

### Optional: get enquiries automatically in your inbox

If you want submissions delivered to email **without** the user pressing send, sign up for a
free [Formspree](https://formspree.io) form and point the form's `action` to your Formspree
endpoint, or use [EmailJS](https://www.emailjs.com). Ask and this can be wired in.

## Business details

| | |
|---|---|
| **Owner** | Aamir Khan |
| **Phone / WhatsApp** | 9929193099 |
| **Email** | aamnacomputer@gmail.com |
| **Address** | Near Bank of Baroda, Tekda Mod, Sultana, Tahsil-Chirawa, Dist-Jhunjhunu, Rajasthan - 333028 |

To edit services, names, or numbers, update `src/data/services.js`.
