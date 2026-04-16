# Biolune Website

Next.js website for biolune.eu — precision longevity protocol for high-performers.

---

## Deploy to Vercel (step-by-step)

### Step 1: Push to GitHub

1. Go to [github.com](https://github.com) → click **New repository**
2. Name it `biolune-website`, set it to **Private**, click **Create**
3. Open Terminal on your Mac and run these commands one by one:

```bash
cd /path/to/biolune-website     # navigate to this folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/biolune-website.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

---

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **Add New… → Project**
3. Click **Import** next to `biolune-website`
4. Leave all settings as default (Vercel auto-detects Next.js)
5. Click **Deploy**
6. Wait ~2 minutes — your site will be live at a `.vercel.app` URL

---

### Step 3: Connect biolune.eu domain

1. In your Vercel project, go to **Settings → Domains**
2. Type `biolune.eu` and click **Add**
3. Also add `www.biolune.eu`
4. Vercel will show you DNS records to add. Go to your domain registrar (e.g. Namecheap, GoDaddy, TransIP)
5. Add these DNS records:

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 76.76.21.21            |
| CNAME | www  | cname.vercel-dns.com   |

6. Wait 5–30 minutes for DNS to propagate
7. Vercel will automatically issue an SSL certificate (HTTPS)

---

### Step 4: Redirect biolune.nl (if needed)

Do the same in Vercel Domains — add `biolune.nl` and `www.biolune.nl`. Vercel will redirect to `biolune.eu`.

---

## Local development

```bash
npm install        # install dependencies (first time only)
npm run dev        # start local server at http://localhost:3000
npm run build      # build for production
```

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx           ← root layout (navbar + footer)
│   ├── globals.css          ← brand colors, global styles
│   ├── page.tsx             ← homepage
│   ├── about/page.tsx
│   ├── pricing/page.tsx
│   ├── apply/page.tsx
│   ├── contact/page.tsx
│   ├── success-stories/page.tsx
│   ├── news/page.tsx
│   └── legal/
│       ├── privacy-policy/page.tsx
│       ├── terms-of-service/page.tsx
│       ├── cookie-policy/page.tsx
│       └── licensing-agreement/page.tsx
└── components/
    ├── Navbar.tsx            ← desktop nav + mobile hamburger
    ├── Footer.tsx            ← newsletter + footer links
    ├── Carousel.tsx          ← swipeable (touch + mouse drag)
    └── Faq.tsx               ← accordion FAQ
```

---

## Editing content

Everything is plain text inside the `.tsx` files. To edit:

- **Homepage content** → `src/app/page.tsx`
- **About founder story** → `src/app/about/page.tsx`
- **Pricing** → `src/app/pricing/page.tsx`
- **Success stories** → `src/app/success-stories/page.tsx`
- **Colors/fonts** → `src/app/globals.css` (the `:root` variables at the top)

After any edit, Vercel automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update homepage text"
git push
```

---

## Form submissions (apply / contact)

The forms currently display only (no backend). To receive submissions:

1. Sign up at [resend.com](https://resend.com) (you already have an account)
2. Create an API route at `src/app/api/contact/route.ts`
3. Add `RESEND_API_KEY=your_key` to Vercel → Settings → Environment Variables
4. Update the form `onSubmit` to POST to `/api/contact`

Let me know if you want me to build this — it's a 30-minute addition.

---

## Tech stack

- **Framework:** Next.js 14 (App Router)
- **Hosting:** Vercel
- **Fonts:** Cormorant Garamond (serif display), Jost (labels/UI), Inter (body)
- **CSS:** Plain CSS with CSS variables — no Tailwind, no UI libraries
- **Images:** Legacy images still served from framerusercontent.com CDN (migrating to `/public` folder)
