# make something

build your first app with ai. no coding experience needed. seriously.

## what is this?

this is the starter project for **make something** — a free, live tutorial where
you build a real app using an ai that writes code for you. you describe what you
want, the ai builds it, and you see it live in your browser.

## who this is for

- complete beginners — zero coding knowledge needed
- people with ideas who don't know where to start
- anyone curious about building with ai

## setup

### mac
1. **download the codex app** — [codex app for mac](https://openai.com/codex)
2. **download this project** — [download ZIP](https://github.com/filip-pilar/makesomething/archive/refs/heads/main.zip)
3. **unzip** the downloaded file
4. **open the folder in codex** — drag it in or use File > Open Folder
5. **type `$install-mac`** to set things up
6. **type `$start`** and start building

### windows
1. **download the codex app** — [codex app on microsoft store](https://apps.microsoft.com/)
2. **download this project** — [download ZIP](https://github.com/filip-pilar/makesomething/archive/refs/heads/main.zip)
3. **unzip** the downloaded file
4. **open the folder in codex** — drag it in or use File > Open Folder
5. **type `$install-windows`** to set things up
6. **type `$start`** and start building

## commands

| command | what it does |
|---------|-------------|
| `$install-mac` | set up your Mac to run the project |
| `$install-windows` | set up your Windows PC to run the project |
| `$start` | brainstorm an idea and start building |
| `$imlost` | get unstuck when you're confused |
| `$fixit` | fix problems automatically |
| `$deploy` | put your app on the internet with a shareable link |

## deploy now

1. Login with `npx vercel login`
2. Deploy production with `npx vercel --prod --yes`
3. Use your Vercel domain (like `https://portfolio-...vercel.app`)

If you connect your GitHub repo to Vercel, every push deploys automatically.

## GitHub Auto-Deploy setup
1. In GitHub repo > Settings > Secrets and variables > Actions, add:
   - `VERCEL_TOKEN` (from Vercel account settings)
   - `VERCEL_ORG_ID` (from Vercel project settings)
   - `VERCEL_PROJECT_ID` (from Vercel project settings)
2. Push to `main`.
3. GitHub Actions runs `.github/workflows/deploy.yml` and auto-deploys to production.

## what's in the box

this project comes pre-loaded with everything you need to build a real app.
you don't need to know what any of it is — the ai handles it all.
