# GDG on Campus RVCE — Interface Unlocked Edition

A modern, interactive, mobile-first redesign of the **Google Developer Groups (GDG) on Campus RVCE** platform, built for the **Interface Unlocked** UI Design Challenge.

- **Live Website:** [https://gdg-rvce-website.vercel.app](https://gdg-rvce-website.vercel.app)
- **Demo Walkthrough Video:** [Watch the Demo Video](<YOUR_GOOGLE_DRIVE_VIDEO_LINK>)
- **GitHub Repository:** [https://github.com/adithyamahesh944-pixel/gdg-rvce-website](https://github.com/adithyamahesh944-pixel/gdg-rvce-website)

---

## Key Features

- **Interactive Hero & Brand Motion:** Cursor-reactive geometric shapes inspired by the four Google brand colors paired with clean Space Grotesk and Inter typography.
- **Persistent Light & Dark Mode:** Instant theme switching from the navbar with `localStorage` persistence and dynamic OpenGraph social preview cards (`/opengraph-image`).
- **Keyboard-First Command Palette (`Ctrl + K` / `Cmd + K`):** Global quick-search modal to jump directly to routes, events, and community verticals.
- **Event Discovery & Google Calendar Sync (`/events`):** Category filtering across Hackathons, Study Jams, and Workshops, detailed event modals (adapting to bottom-sheet drawers on mobile), and one-click **Add to Google Calendar** export.
- **Interactive 3D Builder Pass:** Live customizable developer badge generator with name input, track selection (*Web & Next.js*, *AI & ML*, *Cloud & DevOps*, *Android & Flutter*), 3D mouse/touch perspective tilt, and instant high-resolution PNG download.
- **Mobile-First Experience (`/team` & Custom 404):** 44px+ accessible touch targets, swipeable horizontal filter chips on the Team directory, and a custom GDG RVCE 404 recovery screen.

---

## Tech Stack

- **Framework:** Next.js 13 (App Router)
- **Language:** TypeScript / React
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

---

## Local Development

```bash
# 1. Clone the repository
git clone [https://github.com/adithyamahesh944-pixel/gdg-rvce-website.git](https://github.com/adithyamahesh944-pixel/gdg-rvce-website.git)
cd gdg-rvce-website

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
