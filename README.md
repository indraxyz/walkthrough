# Walkthrough

Creating Walkthrough interaction. The homepage is a single full-viewport experience with a central hexagon motif and three main sections, navigated by scroll on desktop and by section switcher (with optional view transitions) on mobile.

**Homepage overview**

- **Header** — Logo, section navigation (Hero / Walkthrough / Form), and Back / Reset actions.
- **Central hexagon** — Visual anchor that scales and switches between gradient and solid styles depending on the active section; on form completion it can show a short “thanks” animation.

**Sections**

1. **Hero** — Zigzag layout of short opinion snippets (e.g. “WA businesses feel confident about future growth”, “AI can’t replace creativity”), a headline (“Compare your thoughts on **technology** with current industry opinions”), and a primary CTA: “Get a reality check” to go to the walkthrough.

2. **Walkthrough** — Swiper carousel with three slides: (1) professionals shared how they feel about technology; (2) you answer a handful of questions and we compare with your industry; (3) you get insights and a reality check in a few minutes. Pagination dots and Continue / “Get started” button advance slides; “Get started” leads to the form.

3. **Form** — Multi-step form (first name, then email) with step-by-step prompts and validation (React Hook Form + Zod). After submitting, a “Thanks, {firstName}!” screen explains that the reality check will take 2–3 minutes and a “Continue” action completes the flow (e.g. back to hero or reset).

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, TypeScript 5, Tailwind CSS 4
- **Animations:** GSAP, Lenis (smooth scroll), View Transitions API
- **Forms:** React Hook Form, Zod, `@hookform/resolvers`
- **Carousel:** Swiper
- **Icons:** Lucide React

## Project structure

```
├── app/
│   ├── layout.tsx       # Root layout, fonts, metadata
│   ├── page.tsx         # Entry page (renders HomePage)
│   ├── HomePage.tsx     # Main client page: sections, nav, hexagon
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Logo.tsx
│   ├── Hexagon.tsx / SolidHexagon.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── WalkthroughSection.tsx
│   │   ├── FormSection.tsx
│   │   └── ResultSection.tsx
│   ├── form/
│   │   ├── FormInput.tsx
│   │   └── InputWithSubmit.tsx
│   └── ui/
│       └── Button.tsx
├── hooks/
│   └── useIsMobile.ts
├── lib/
│   └── form-schema.ts
└── public/
```

## Prerequisites

- Node.js 18+
- pnpm (recommended), npm, or yarn

## Getting started

**Install dependencies:**

```bash
pnpm install
# or: npm install | yarn install
```

**Run the development server:**

```bash
pnpm dev
# or: npm run dev | yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Build for production:**

```bash
pnpm build
```

**Run production build locally:**

```bash
pnpm start
```

**Lint:**

```bash
pnpm lint
```

## Deploy on Vercel

### Option A: Deploy via Vercel Dashboard (GitHub/GitLab/Bitbucket)

1. **Push your code** to a Git repository (GitHub, GitLab, or Bitbucket).

2. **Sign in to Vercel**  
   Go to [vercel.com](https://vercel.com) and sign in with your Git provider.

3. **Import the project**
   - Click **Add New…** → **Project**.
   - Select your repository (e.g. `walkthrough`).
   - Vercel will detect Next.js and set **Framework Preset** to Next.js and **Build Command** to `next build`.

4. **Configure (optional)**
   - **Root Directory:** Leave default unless the app lives in a subfolder.
   - **Environment variables:** Add any needed in the project settings.
   - **Build and Output:** Defaults are fine for a standard Next.js app.

5. **Deploy**
   - Click **Deploy**.
   - Wait for the build to finish. Each push to the default branch will trigger a new deployment.

6. **Custom domain (optional)**  
   In the project → **Settings** → **Domains**, add your domain and follow the DNS instructions.

### Option B: Deploy via Vercel CLI

1. **Install the Vercel CLI:**

   ```bash
   pnpm add -g vercel
   # or: npm i -g vercel
   ```

2. **Log in:**

   ```bash
   vercel login
   ```

3. **Deploy from the project root:**

   ```bash
   vercel
   ```

   - First run: link the project to a new or existing Vercel project and confirm settings.
   - Subsequent runs: `vercel` deploys a preview; `vercel --prod` deploys to production.

4. **Production deploy:**

   ```bash
   vercel --prod
   ```

### Post-deploy

- **Preview URLs:** Every push (or `vercel` without `--prod`) gets a unique preview URL.
- **Production URL:** After `vercel --prod` or after enabling production from the dashboard, your app is available at `https://<project-name>.vercel.app` (or your custom domain).

For more detail, see [Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying) and [Vercel Docs](https://vercel.com/docs).
