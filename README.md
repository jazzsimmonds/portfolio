# pentest-portfolio

Your personal pentesting portfolio — dark terminal aesthetic with pastel accents.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Personalise it

### 1. Your name & metadata
- `app/layout.tsx` — update the `title` and `description`
- `components/Navbar.tsx` — replace `yourname` with your handle
- `components/Footer.tsx` — same

### 2. Hero section (`components/Hero.tsx`)
- Update `terminalLines` with your real specialties and certs
- Edit the tagline under the main heading

### 3. About (`components/About.tsx`)
- Replace the bio paragraphs with your own text
- Update the three stat pills (engagements, CVEs, CTF wins)
- Edit `skills` array — names and proficiency levels
- Swap out `tools` array for tools you actually use

### 4. Experience (`components/Experience.tsx`)
- Replace `experiences` with your real roles and bullet points
- Update `certs` with your actual certifications
- Edit the education block

### 5. CTF & Projects (`components/CTF.tsx`)
- Replace `projects` array with your real writeups, CVEs, and tools
- Update the link at the bottom to your actual HackTheBox profile and GitHub

### 6. Contact (`components/Contact.tsx`)
- Replace `you@yoursite.com` with your email (in two places)
- Update the social links with your real handles

## Colour palette
- Lavender: `#d4b8f0`
- Mint: `#b8f0d4`
- Pink: `#f0b8d4`
- Peach: `#f0d4b8`
- Background: `#0a0a0f`

All in `tailwind.config.js` if you want to tweak them.

## Deploy
Works out of the box on Vercel:
```bash
npx vercel
```
