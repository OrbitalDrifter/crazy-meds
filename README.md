# CrazyMeds

Psychiatric medication reference for the educated consumer.  
Written and maintained by Jerod Poore.

---

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Deploying to Cloudflare Pages

### First-time setup

1. Push this folder to a GitHub repository.

2. Go to https://dash.cloudflare.com and log in (free account).

3. Click **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.

4. Select your GitHub repo.

5. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`

6. Click **Save and Deploy**. That's it.

### Connecting your domain (crazy-meds.org)

After the first deploy:

1. In Cloudflare Pages → your project → **Custom domains** → **Set up a custom domain**.

2. Enter `crazy-meds.org` (and optionally `www.crazy-meds.org`).

3. If crazy-meds.org is already registered through Cloudflare, DNS updates automatically.
   If it's registered elsewhere, point the nameservers to Cloudflare or add the CNAME
   record they give you.

SSL is free and automatic.

### Adding more medications

Open `src/App.jsx` and find the `MEDS` array near the top of the file.
Each medication is an object. Copy the structure of an existing entry and fill in the fields.
Not all fields are required — the page will only show sections that have content.

Available fields:
- `id` — lowercase, no spaces (e.g. `"wellbutrin"`)
- `brandName` — e.g. `"Wellbutrin"`
- `genericName` — e.g. `"bupropion"`
- `otherForms` — optional, other formulations
- `classes` — array of drug classes (e.g. `["Antidepressant", "NDRI"]`)
- `approvedUses` — array of strings
- `overseasUses` — optional, string
- `offLabelUses` — array of strings
- `onset` — string, onset of action and likelihood of working
- `dosage` — string
- `howToStop` — string
- `halfLife` — optional, string
- `steadyState` — optional, string
- `shelfLife` — optional, string
- `pros` — optional, string
- `cons` — optional, string
- `sideEffectsTypical` — optional, string
- `sideEffectsUncommon` — optional, string
- `sideEffectsRare` — optional, string
- `interestingStuff` — optional, string
- `comments` — optional, string

After editing, Cloudflare Pages will auto-redeploy if you push to GitHub.
