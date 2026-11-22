# GDG on Campus RVCE — Official Website

A responsive, multi-page community web application built for **Google Developer Groups (GDG) on Campus — RV College of Engineering, Bengaluru**, created for the **Interface Unlocked** UI Challenge.

🔗 **Live Demo:** https://gdg-rvce-website.vercel.app

---

## ✨ Features

- **Multi-Page Navigation:** Clean routing across **Home**, **Events**, and **Team** pages built with the Next.js App Router.
- **Interactive Event Modals:** Clickable event cards with detailed session breakdowns, keyboard (`Esc`) support, and accessible backdrop dismissal.
- **Light & Dark Theme Support:** Seamless theme switching across all routes and components.
- **Google Developer Brand System:** Custom geometric hero visuals, Google-inspired color tokens, and **Space Grotesk** typography via `next/font/google`.
- **Responsive Design:** Mobile-first layouts engineered for desktop, tablet, and mobile viewports.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **UI Library:** React
- **Styling:** Tailwind CSS & CSS Custom Properties
- **Typography:** Google Fonts (`Space Grotesk`)
- **Deployment & CI/CD:** GitHub + Vercel

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── events/page.js      # Events showcase & interactive modal triggers
│   ├── team/page.js        # Core team & community verticals directory
│   ├── globals.css         # Design tokens, Tailwind layers & theme variables
│   ├── layout.jsx          # Root layout, metadata & global Navbar/Footer
│   └── page.js             # Landing page with hero, stats & highlights
├── components/
│   ├── Footer.jsx          # Global footer with community links
│   └── Navbar.jsx          # Responsive pill navigation & theme toggle
└── data/
    └── gdgData.js          # Structured event & team member data
