# Quick Start: Building & Deploying Your Demo

## TL;DR - Do This to Go Live

### 1. Build for Production (Run Once)
```powershell
npm run build
```
This creates a `build/` folder with optimized files ready for the internet.

---

### 2. Choose One Deployment Method

#### Method A: If your company uses cPanel (Most Common)
1. Connect to cPanel via SFTP using FileZilla or WinSCP
2. Go to `public_html/` folder
3. Delete everything inside
4. Copy ALL files from your local `build/` folder into `public_html/`
5. Create `.htaccess` file in `public_html/` with:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```
6. Open your website URL → Done! ✅

---

#### Method B: If using Vercel (Easiest - Recommended)
1. Push your code to GitHub: `git push`
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repo
5. Click "Deploy"
6. Wait 1-2 minutes
7. Your demo is live at the URL they provide ✅

---

#### Method C: If using Netlify (Also Easy)
1. Go to https://netlify.com
2. Click "New Site from Git"
3. Select your GitHub repo
4. Set Build Command: `npm run build`
5. Set Publish Directory: `build`
6. Click "Deploy"
7. Wait 1-2 minutes
8. Your demo is live ✅

---

## To Update the Demo Later

### Scenario 1: Update Demo Steps (Most Common)
```
1. Edit src/data/demoSteps.js
2. Add new screenshots to src/assets/screens/
3. Test: npm start (check in browser)
4. Build: npm run build
5. Deploy using one of the methods above
6. Test on live website
7. Done!
```

### Scenario 2: Update Colors, Fonts, Layout
```
1. Edit src/styles/*.css or src/components/
2. Test: npm start
3. Build: npm run build
4. Deploy
```

### Scenario 3: Fix a Bug
```
1. Edit src/components/ files
2. Test: npm start
3. Build: npm run build
4. Deploy
```

---

## Deployment Comparison Table

| Method | Setup Time | Cost | Auto-Updates | Best For |
|--------|-----------|------|--------------|----------|
| **cPanel** | 15 min | Free (existing) | Manual | Budget-friendly, control |
| **Vercel** | 5 min | Free tier | Automatic | Easiest, React-optimized |
| **Netlify** | 5 min | Free tier | Automatic | Easy, reliable |
| **AWS** | 1-2 hours | $20-100/mo | Manual | Enterprise-scale |

---

## Industry Standard Process

Most companies follow this workflow:

```
Developer Updates Code
    ↓
Commits to Git/GitHub
    ↓
Code Review (if team size > 1)
    ↓
Merge to Main Branch
    ↓
Automatic or Manual Build
    ↓
Deploy to Production
    ↓
QA Testing on Live Website
    ↓
Monitor & Collect Feedback
```

Your project is simple enough that you can:
- Manual build: `npm run build`
- Manual deploy: Upload to cPanel/Vercel
- Takes ~10 minutes per update

---

## File Structure When Deployed

### On cPanel:
```
public_html/                  ← Your website root
├── index.html               ← Main page
├── favicon.ico
├── .htaccess                ← Important! Routes all traffic to index.html
└── static/
    ├── js/                  ← JavaScript
    ├── css/                 ← Stylesheets
    └── media/               ← Images
```

### On Vercel/Netlify:
- Same structure, but they handle the `.htaccess` automatically

---

## What Your Hosting/DevOps Team Needs to Know

Share this with them:

```
Project Information:
- Technology: React 18.2.0 (SPA)
- Size: ~2-3 MB
- Build command: npm run build
- Output directory: build/
- No backend required
- No database required
- Static files only

.htaccess Needed:
If using Apache (cPanel), add the rewrite rules 
to handle client-side routing.

No Special Configuration:
- No Node.js runtime needed on server
- No npm packages needed on server
- Just serve static files
- Enable GZIP compression if possible
```

---

## Quick Troubleshooting

**Problem: Build fails**
```
Solution: 
- Delete node_modules: rm -r node_modules
- Reinstall: npm install
- Try again: npm run build
```

**Problem: Demo doesn't work after upload**
```
Solution:
- Check .htaccess file is present
- Check all files from build/ are uploaded
- Clear browser cache
- Check browser console for errors (F12)
```

**Problem: Images not showing**
```
Solution:
- Make sure screenshot files are in src/assets/screens/
- Check demoSteps.js has correct image paths
- Test locally first: npm start
```

**Problem: Slow loading**
```
Solution:
- Ask hosting provider to enable GZIP compression
- Add CDN caching
- Optimize image sizes
```

---

## Checklist for Going Live

- [ ] Tested demo locally with `npm start`
- [ ] All steps display correctly
- [ ] All images load properly
- [ ] Navigation works (← → buttons)
- [ ] Keyboard shortcuts work (arrow keys)
- [ ] Responsive on mobile/tablet
- [ ] Ran `npm run build` successfully
- [ ] `build/` folder created with all files
- [ ] Chose hosting method (cPanel/Vercel/Netlify)
- [ ] Deployed successfully
- [ ] Tested on live website
- [ ] Shared access with team
- [ ] Documented the deployment steps
- [ ] Shared this guide with hosting team

---

## Key Concepts Explained

**Build Process:** Converting your development code (large, readable) into production code (small, optimized)

**SPA (Single Page Application):** A website that runs entirely in the browser. No server processing needed.

**Static Files:** HTML, CSS, JavaScript, images that don't change. Don't need a backend.

**Deployment:** Uploading your files to a server so people can access them via the internet.

**cPanel:** Control panel for managing web hosting accounts (file upload, email, domains, etc.)

**Vercel/Netlify:** Modern hosting platforms optimized for JavaScript projects. They automate everything.

---

## Next Steps

1. **Run this NOW:**
   ```powershell
   npm run build
   ```

2. **Choose your hosting:**
   - cPanel (if available)
   - Vercel (recommended, easiest)
   - Netlify (also good)

3. **Follow deployment steps for your choice**

4. **Test on live website**

5. **Keep this guide** for future updates

---

## Questions to Ask Your Senior/DevOps Team

1. "Do we have cPanel hosting available?"
2. "What's our deployment process?"
3. "Who manages server/hosting?"
4. "Do we use GitHub/GitLab?"
5. "Should I use Vercel/Netlify or cPanel?"
6. "How do we handle multiple demos in future?"
7. "What's the approval process before going live?"

---

**Remember:** The `build/` folder is what you give to your hosting team. Everything else is for development only.
