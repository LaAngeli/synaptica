# Synaptica Cluj — ghid proiect

## Ce e
Site bilingv (RO/EN) de prezentare + generare lead-uri pentru o clinică de **neurofeedback și
brainmapping EEG** din Cluj-Napoca (Str. Robert Koch 7). Producție: https://synaptica-cluj.ro.
**Fără DB, fără auth de utilizatori, fără CMS** — conținutul e hardcodat în `lib/` + `app/i18n/`.

## Stack
- **Next.js 16.1.1** (App Router) + **React 19.2.3**
- **JavaScript** pur (`.jsx` / `.js`) — NU TypeScript (`typescript` e instalat doar pentru tipuri).
  Nu introduce `.ts` / `.tsx` fără să întrebi.
- **Tailwind CSS v4** (plugin `@tailwindcss/postcss`). Nu există `tailwind.config.js` clasic —
  tema e in-CSS via `@theme` în `app/globals.css`.
- `lucide-react` + `react-icons` (iconografie), `next/font` (Geist / Geist Mono)
- `nodemailer` (SMTP) — doar pentru formularul de contact
- Alias import: `@/*` → rădăcina proiectului (`jsconfig.json`)

## Comenzi
- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` — build de producție
- `npm run start` — start producție (`next start -H 0.0.0.0 -p ${PORT:-3000}`)
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)
- Nu există teste configurate.

## Structură
- `app/` — App Router. Fiecare rută are `page.jsx` + un `layout.jsx` dedicat pentru metadata.
  - `app/components/` — componente partajate (NavBar, Footer, HomePage, FaqPage, ...)
  - `app/api/contact/` — **singurul backend**: `POST /api/contact` + `GET /api/contact/csrf`
  - `app/i18n/` — `translations.js` (RO/EN) + `branding.js` (paletă brand)
  - `app/providers.jsx` — `I18nProvider` (Context) + hook `useI18n()`
- `lib/` — logică non-UI: `seo.js` (helpers metadata), `schema-jsonld.js`, `faq-content.js`,
  `service-images.js`, `businessContact.js` (NAP — sursă unică), `google-consent.js`
- `public/` — imagini `.webp` responsive (480/768/1024), `llms.txt` / `llms-full.txt`, logo-uri

## Convenții importante
- **i18n:** tot textul vizibil trece prin `t("cale.cheie")` din `useI18n()`. Cheile se adaugă în
  `app/i18n/translations.js` pentru **ambele** limbi (`ro` + `en`). Nu hardcoda string-uri în componente.
- **SEO:** metadata paginilor se face cu `createPageMetadata()` din `lib/seo.js` (în `layout.jsx`-ul
  fiecărei rute). Titlul primește automat sufixul „| Synaptica Cluj". Nu seta canonical/OG manual.
- **JSON-LD:** graph `MedicalClinic` + `WebSite` în `lib/schema-jsonld.js`; datele NAP vin din
  `lib/businessContact.js` — modifică acolo, nu în mai multe locuri.
- **Paletă brand:** navy `#0b1527` + auriu `#817e32`→`#cdb360`, fundal `#eef3f7`. Sursă: `app/i18n/branding.js`.
- **GDPR/consimțământ:** Google Consent Mode v2 (Advanced) + GTM (`GTM-NL3XVBXL`) + Meta Pixel sunt
  injectate în `app/layout.jsx` și controlate de bannerul de cookies (`lib/google-consent.js`,
  `CONSENT_STORAGE_KEY`). Blocul `consent 'default' denied` TREBUIE să ruleze înainte de GTM —
  nu schimba ordinea scripturilor. Analytics/pixel pornesc doar după accept.

## Capcane (gotchas)
- **XAMPP e irelevant** — proiectul stă în `htdocs/` dar rulează pe Node (`next`), nu pe Apache/PHP.
- **Rate-limiter-ul de contact e in-memory** (`Map` global în `app/api/contact/route.js`) — se pierde
  la restart și nu funcționează corect pe mai multe instanțe. La scalare, mută pe store extern (Redis/Upstash).
- **Redirect `www`→non-`www` e dublu** (`middleware.js` + `next.config.mjs`) — modifică-le sincron.
- **`.env` e necesar** pentru contact (SMTP + reCAPTCHA), vezi `.env.example`. Fără el, `/api/contact`
  răspunde 500. `.env` e gitignored.
- Verificarea originii în `/api/contact` e activă doar în `production` (`NODE_ENV`).

## Git & deploy (regulă durabilă a userului)
- **Push = deploy live.** Hostul urmărește repo-ul și lansează deploy automat la fiecare push pe `main`.
  Push-ul e acțiune de producție, nu de sincronizare. **Push doar la cererea explicită a userului**,
  niciodată automat după commit. Fiecare `git push` cere confirmare separată (`permissions.ask`).
  Nu înlănțui `git push` după `git commit` decât dacă userul a spus „commit and push" / „push now" /
  „deploy" în aceeași cerere.
- **Commit automat după fiecare task încheiat cu succes**, fără să mai întreb. Un task e „cu succes" când:
  modificările sunt complete și coerente (nu în iterație), `npm run lint` nu semnalează erori noi și,
  când e cazul, feature-ul a fost verificat vizual (dev server / preview).
- **NU comit** dacă: taskul e încă în iterație, userul a cerut să reverteze/revizuiască, modificările
  sunt parțiale/broken, sau turul curent n-a produs modificări (răspuns la o întrebare pură).
- **Stagez doar fișierele atinse** în task: `git add <files>` explicit, **NICIODATĂ** `git add -A` /
  `git add .` (evită includerea accidentală a `.env`, artefacte, binare).
- **Format commit:** scurt, imperativ, în engleză, matching stilul existent din `git log` (ex.
  „added conscent mode", „bug fix GSC"). **Fără** trailer `Co-Authored-By` — dezactivat în
  `.claude/settings.json` via `attribution.commit: ""`. Fără emoji.
- **Fără `--amend`** pe commit-uri deja făcute — dacă e nevoie de o corecție, commit nou.

## Skill → task (de folosit implicit)
- UI/UX nou sau redesign → `frontend-design`
- Performanță React/Next → `vercel-react-best-practices`
- Orice pe SEO → `seo-audit`
- Accesibilitate → `design:accessibility-review`; microcopy RO/EN → `design:ux-copy`
- Review pe diff (mai ales `/api/contact`) → `code-review` / `security-review`
- Docs live Next 16 / React 19 / Tailwind v4 → **Context7 MCP** (nu te baza pe memorie pentru API-uri noi)
- Rulare + verificare vizuală a schimbărilor → `run` / `verify` + Claude Preview

## Connectors
- **GitHub** și **Figma** — autorizate de user (OAuth). Figma pentru design-to-code pe pagini/componente.
