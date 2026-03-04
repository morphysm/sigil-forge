# GitHub Setup Instructions

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the "+" icon in the top right → "New repository"
3. Fill in:
   - **Repository name**: `sigil-forge`
   - **Description**: "Austin Osman Spare Sigil Method — Digital Implementation"
   - **Visibility**: Public (or Private if you prefer)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

## Step 2: Initialize Local Repository

Open your terminal and navigate to the project folder, then run:

```bash
cd /path/to/sigil-forge
git init
git add .
git commit -m "Initial commit: SIGIL.FORGE v1.0"
```

## Step 3: Connect to GitHub

GitHub will show you commands after creating the repo. Use these:

```bash
git remote add origin https://github.com/YOUR-USERNAME/sigil-forge.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Step 4: Add Your Logo

If you have a `logo.jpg` file:

```bash
# Copy logo to public folder
cp /path/to/logo.jpg public/logo.jpg

# Commit and push
git add public/logo.jpg
git commit -m "Add logo"
git push
```

## Step 5: Add Audio Files

1. Source or create your 22 audio files (see `AUDIO_SOURCES.md`)
2. Place them in `public/sounds/`
3. **DO NOT** commit large audio files to GitHub if you want to keep repo size small
4. Either:
   - Add `public/sounds/*.mp3` to `.gitignore`
   - Or host audio files elsewhere and update paths in `App.jsx`

## Step 6: Test Locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to test.

## Step 7: Deploy (Optional)

### Option A: GitHub Pages
```bash
npm install --save gh-pages
```

Add to `package.json`:
```json
"homepage": "https://YOUR-USERNAME.github.io/sigil-forge",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:
```bash
npm run deploy
```

### Option B: Netlify
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. "New site from Git" → Connect to your GitHub repo
4. Deploy

### Option C: Vercel
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Deploy

## Your Repository is Ready!

Share the link: `https://github.com/YOUR-USERNAME/sigil-forge`
