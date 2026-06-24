# Manaswin – Portfolio

A clean, dark-mode personal portfolio built with vanilla HTML, CSS, and JavaScript. No build tools required.

## Live Demo
Deployed on Vercel → _add your link here after deployment_

## Features
- Responsive layout (mobile-first)
- Smooth scroll & active nav highlighting
- Animated project cards on scroll
- Accessible markup (ARIA labels, semantic HTML)

## Project Structure
```
portfolio/
├── index.html      ← everything lives here (HTML + CSS + JS)
├── vercel.json     ← Vercel routing config
└── README.md
```

## How to Deploy on Vercel via GitHub

1. Push this folder to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your GitHub repo.

3. Vercel auto-detects a static site. Just click **Deploy** — no settings needed.

4. Your site will be live at `https://your-project.vercel.app` in ~30 seconds.

## Customisation Checklist
- [ ] Update your name in the hero section
- [ ] Replace project cards with your real projects and links
- [ ] Update the email address in the Contact section
- [ ] Add your GitHub / LinkedIn / Twitter URLs
- [ ] Swap the emoji avatar for a real photo (`<img>` tag)
- [ ] Update the skills list to match your stack
