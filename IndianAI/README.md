# IndianAI - Multi-Website Platform

**Building Useful Digital Experiences for Everyday India**

Developed by: Mohd Rijvan Khan Mogia  
Location: Maharashtra Nagar, Mankhurd, Mumbai - 400088, Maharashtra, India  
Phone: +91 88281 17342  
Platform: IndianAI (Google Play Console Account)  
Year: 2026

---

## Overview

IndianAI is a multi-website platform that serves as the web presence for 7 Android apps published on Google Play Store. Each app has its own dedicated website with full product pages, privacy policy, and terms & conditions.

---

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom design system with CSS variables
- **JavaScript** - Vanilla JS for UI interactions
- **AngularJS 1.x** - Main site product listing (data-driven)
- **Bootstrap 5** - Responsive grid and components
- **Bootstrap Icons** - Icon library
- **Google Fonts** - Poppins typeface

### CDN Links Used

```
Bootstrap 5 CSS: https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css
Bootstrap Icons: https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css
Bootstrap 5 JS:  https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js
AngularJS 1.8.3: https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js
Google Fonts:    https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap
```

---

## Design System

### Color Variables (CSS Custom Properties)

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #0f172a;
  --accent-color: #06b6d4;
  --text-color: #1e293b;
  --muted-color: #64748b;
  --background-color: #ffffff;
  --light-background: #f8fafc;
  --border-color: #e2e8f0;
}
```

---

## Project Structure

```
IndianAI/
├── index.html              # Main homepage
├── aboutus.html            # About page
├── contact.html            # Contact page
├── services.html           # Services page
├── robots.txt              # SEO robots file
├── sitemap.xml             # XML sitemap
├── README.md               # This file
│
├── css/
│   ├── main.css            # Main stylesheet with design system
│   └── responsive.css      # Media queries
│
├── js/
│   └── main.js             # AngularJS app + vanilla JS
│
├── newsexpress/            # NewsExpress app website
│   ├── index.html
│   ├── about.html
│   ├── contact.html
│   ├── privacy-policy.html
│   ├── terms-and-conditions.html
│   ├── css/
│   │   ├── main.css
│   │   └── responsive.css
│   └── js/
│       └── main.js
│
├── paintora/               # Paintora app website
│   └── [same structure]
│
├── villagecross/           # VillageCross app website
│   └── [same structure]
│
├── indianutilityhub/       # IndianUtilityHub app website
│   └── [same structure]
│
├── crickAdda/              # CrickAdda app website
│   └── [same structure]
│
├── docsnap/                # DocSnap app website
│   └── [same structure]
│
├── InshortAI/              # InshortAI app website
│   └── [same structure]
│
└── _product-template/      # Template for new products
    └── [same structure]
```

---

## Products (7 Apps)

| App | Category | Primary Color | Description |
|-----|----------|---------------|-------------|
| NewsExpress | News | #ef4444 (Red) | Latest news in 60 words |
| Paintora | Creativity | #a855f7 (Purple) | Paint and craft app |
| VillageCross | Game | #22c55e (Green) | 4-player 5x5 board game |
| IndianUtilityHub | Utilities | #0ea5e9 (Blue) | 29 offline daily tools |
| CrickAdda | Cricket | #16a34a (Green) | Local cricket companion |
| DocSnap | Documents | #2563eb (Blue) | 21 document tools |
| InshortAI | AI | #7c3aed (Purple) | AI answers in 60 words |

---

## How to Add a New Product

1. Copy the `_product-template/` folder and rename it to your product slug
2. Update the CSS variables in `css/main.css` to match your product colors
3. Update all content in `index.html`, `about.html`, `contact.html`, `privacy-policy.html`, `terms-and-conditions.html`
4. Add your product to the `$scope.products` array in the main `/js/main.js`
5. Add the product to `/sitemap.xml`
6. Add footer links in main site pages

---

## Key Files

### Main JS (`/js/main.js`)
The AngularJS app contains the product registry. To add a product:
```javascript
$scope.products.push({
  name: 'YourAppName',
  slug: 'yourappslug',
  category: 'Category',
  icon: 'bi-icon-name',
  description: 'Short description here.',
  url: 'yourappslug/index.html',
  color: '#hexcolor'
});
```

### Contact Forms
All contact forms are client-side only (no backend). They validate and show a success message but do not actually send data. To add backend functionality, connect to a form service like Formspree, EmailJS, or your own API.

---

## SEO Notes

- Each page has unique title, description, and OG meta tags
- `robots.txt` allows all crawlers
- `sitemap.xml` lists all 40 pages (5 main + 5 pages x 7 products)
- Update sitemap dates when content changes

---

## Privacy Policy Note

All privacy policies are written with neutral, measured language. They do not claim "we never collect data" because third-party SDKs (Google Play Services, analytics) may collect device information. Each policy accurately describes what data may be collected and by whom.

---

## Developer Contact

For queries about the IndianAI platform or any of the 7 apps:

**Mohd Rijvan Khan Mogia**  
Phone: +91 88281 17342  
Address: Maharashtra Nagar, Mankhurd, Mumbai - 400088, Maharashtra, India  
Platform: IndianAI (Google Play Console)

---

*© 2026 IndianAI. All rights reserved.*
