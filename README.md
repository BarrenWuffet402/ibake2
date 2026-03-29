# iBake — Sourdough Community Platform

A web app for sourdough bakers to share starters, trade recipes, and connect with local bakers. Built with Next.js and Supabase.

**No coding experience needed to run this locally** — just follow the steps below.

---

## What the app does

| Screen | What it is |
|---|---|
| **Map** | See sourdough starters available near you. Request a culture from another baker. |
| **Recipes** | Browse, submit, and comment on community recipes. |
| **Messages** | Chat with bakers after a starter request is accepted. |
| **Tools** | Hydration calculator, feeding ratio calculator, fermentation timer. |
| **Profile** | Your baking identity, points, and activity. |
| **Bonus & Points** | Earn points for sharing, recipes, referrals. Leaderboard + levels. |
| **Video** | Baking videos and live streams from the community. |
| **Shop** | Redeem points for baking gear and premium access. |
| **Forum** | Community discussions. |

The app works fully on demo data out of the box — no account or database needed to explore it.

---

## Before you start — what you need to install

You only need to do this once. If you've already done it, skip ahead to **Getting started**.

### 1. Install Node.js

Node.js is what runs the app on your computer.

1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** version (the one that says "Recommended For Most Users")
3. Open the downloaded file and follow the installer

To check it worked, open **Terminal** (Mac) or **Command Prompt** (Windows) and type:
```
node --version
```
You should see something like `v20.x.x`. If you do, you're good.

### 2. Install Git

Git is what lets you download and sync code.

1. Go to [git-scm.com/downloads](https://git-scm.com/downloads)
2. Download and install for your operating system
3. Follow the installer with default settings

To check it worked, type in Terminal:
```
git --version
```
You should see something like `git version 2.x.x`.

---

## Getting started

Open **Terminal** (Mac: press `Cmd + Space`, type "Terminal", press Enter).

Then run these commands one at a time — copy each line, paste it in Terminal, and press Enter:

**Step 1 — Download the project:**
```bash
git clone https://github.com/YOUR-REPO-URL/ibake.git
```
*(Replace the URL with the actual GitHub link — ask Johan for it)*

**Step 2 — Go into the project folder:**
```bash
cd ibake/web-next
```

**Step 3 — Install dependencies:**
```bash
npm install
```
This downloads everything the app needs. It takes 1–2 minutes. You'll see a lot of text scroll by — that's normal.

**Step 4 — Start the app:**
```bash
npm run dev
```

**Step 5 — Open the app in your browser:**

Go to [http://localhost:3000](http://localhost:3000)

You should see the iBake map screen with demo data. That's it — you're running the app!

---

## Stopping the app

In Terminal, press `Ctrl + C`. The app will stop. To start it again, just run `npm run dev` from the `ibake/web-next` folder.

---

## Next time you open your computer

You don't need to reinstall anything. Just:
1. Open Terminal
2. Type `cd ibake/web-next` and press Enter
3. Type `npm run dev` and press Enter
4. Go to [http://localhost:3000](http://localhost:3000)

---

## Getting the latest changes from your co-founder

When your co-founder pushes new code to GitHub, you can sync it like this:

1. Open Terminal
2. Go to the project: `cd ibake`
3. Pull the latest: `git pull`
4. Go into the app folder: `cd web-next`
5. Install any new dependencies: `npm install`
6. Start the app: `npm run dev`

---

## Something not working?

**"command not found: npm"** → Node.js isn't installed. Go back to the Node.js install step above.

**"command not found: git"** → Git isn't installed. Go back to the Git install step.

**"port 3000 already in use"** → Something else is using that port. Either close the other app, or the terminal will tell you a new port to use (like 3001).

**Page won't load** → Make sure you see "Ready" in Terminal after running `npm run dev`. Wait a few seconds for it to finish starting.

**Anything else** → Message Johan.

---

## For developers

See [WORKFLOW.md](./WORKFLOW.md) for the full technical reference: project structure, data architecture, design system, conventions, Supabase setup, and deployment.

---

## Tech stack

- **Next.js 16** (App Router, webpack)
- **Tailwind CSS** — vintage autumn palette
- **Supabase** — Postgres, auth, storage, realtime
- **React Leaflet** — interactive map
- **TypeScript** throughout
