# Enable GitHub Pages

## Steps:

1. Go to your repository: https://github.com/holtzeidler/bar-graph-clock

2. Click on **Settings** (top right of the repository page)

3. Scroll down to **Pages** in the left sidebar

4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`

5. Click **Save**

6. Wait 1-2 minutes for GitHub to build your site

7. Your site will be available at:
   **https://holtzeidler.github.io/bar-graph-clock/**

## iPad Setup:

1. Open Safari on your iPad
2. Go to: https://holtzeidler.github.io/bar-graph-clock/
3. Tap the Share button (square with arrow)
4. Tap "Add to Home Screen"
5. Name it "Bar Graph Clock" (or whatever you want)
6. Tap "Add"

## Keep iPad Display On:

1. Settings → Display & Brightness → Auto-Lock → Never
2. Settings → General → Auto-Lock → Never (if available)
3. Keep it plugged in!

## Update the Clock:

Any time you make changes:
```bash
cd /Users/holtzeidler/bar-graph-clock
git add .
git commit -m "Your update message"
git push
```

The changes will appear on your iPad within 1-2 minutes!
