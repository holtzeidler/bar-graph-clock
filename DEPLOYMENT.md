# Deployment Guide for iPad Display

## Option 1: GitHub Pages (Recommended - Free & Easy)

### Steps:
1. Create a new repository on GitHub (github.com)
2. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/bar-graph-clock.git
   git branch -M main
   git push -u origin main
   ```
3. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Save
4. Your site will be available at: `https://YOUR_USERNAME.github.io/bar-graph-clock/`
5. On your iPad, open Safari and bookmark this URL
6. Add to Home Screen: Share button → Add to Home Screen

---

## Option 2: Netlify Drop (Easiest - No Account Needed)

### Steps:
1. Go to https://app.netlify.com/drop
2. Drag and drop your `/Users/holtzeidler/bar-graph-clock` folder
3. You'll get a URL like `https://random-name-123.netlify.app`
4. Bookmark on iPad and add to Home Screen

---

## Option 3: Local Web Server (Home Network Only)

### Using Python (if installed):
```bash
cd /Users/holtzeidler/bar-graph-clock
python3 -m http.server 8000
```

### Using Node.js (if installed):
```bash
cd /Users/holtzeidler/bar-graph-clock
npx http-server -p 8000
```

Then on your iPad:
1. Find your computer's IP address: `ifconfig | grep "inet "` (look for 192.168.x.x)
2. On iPad Safari, go to: `http://YOUR_IP_ADDRESS:8000`
3. Bookmark and add to Home Screen

**Note:** Your computer must stay on and connected to the same WiFi network.

---

## Option 4: Vercel (Free & Fast)

### Steps:
1. Install Vercel CLI: `npm i -g vercel`
2. In your project folder:
   ```bash
   cd /Users/holtzeidler/bar-graph-clock
   vercel
   ```
3. Follow the prompts (defaults are fine)
4. You'll get a URL like `https://bar-graph-clock.vercel.app`
5. Bookmark on iPad

---

## iPad Setup Tips

1. **Keep Screen On**: Settings → Display & Brightness → Auto-Lock → Never
2. **Remove Safari UI**: Once bookmarked, open from Home Screen (not Safari) for fullscreen
3. **Disable Sleep**: Settings → General → Auto-Lock → Never
4. **Keep Charged**: Consider a charging dock/stand

---

## Recommended: GitHub Pages
- ✅ Free forever
- ✅ Accessible from anywhere
- ✅ Easy to update (just push changes)
- ✅ No server to maintain
- ✅ Works great on old iPads
