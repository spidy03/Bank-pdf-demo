# Tally Bank PDF Demo - Hosting & Deployment Instructions for Hosting Team

## Project Summary

**Project Name:** Tally Bank PDF Demo  
**Technology:** React 18.2.0 (Single Page Application - SPA)  
**Type:** Interactive product walkthrough demo  
**Size:** ~2-3 MB (production build)  
**Duration:** 27 interactive steps  

---

## What You're Receiving

### 1. Production Build (Ready to Deploy)
**Location:** `build/` folder  
**Files:** Pre-optimized, minified, compressed  
**Size:** ~2-3 MB total  
**Format:** Static HTML, CSS, JavaScript files  

**Structure:**
```
build/
├── index.html              ← Main entry point (open this in browser)
├── favicon.ico
├── asset-manifest.json
├── static/
│   ├── js/
│   │   ├── main.ce28ab56.js (main application)
│   │   ├── ...
│   ├── css/
│   │   └── main.90b7f95b.css
│   └── media/
│       └── (images and assets)
└── [screenshot images from demo steps]
```

### 2. Source Code (For Future Maintenance)
**Location:** Entire project folder  
**For:** Developer team updates in future  
**Format:** React JSX + CSS

---

## Deployment Instructions

### Option 1: cPanel / Apache Hosting (Most Common)

**Prerequisites:**
- cPanel/FTP access
- Apache server with mod_rewrite enabled

**Steps:**

1. **Connect via SFTP**
   - Host: your-domain.com
   - Port: 22 (SFTP) or 21 (FTP)
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Client: FileZilla, WinSCP, Cyberduck

2. **Upload Build Files**
   - Navigate to: `public_html/` folder
   - Delete all existing files (backup first!)
   - Upload ALL files from `build/` folder into `public_html/`
   - Ensure directory structure is preserved

3. **Create .htaccess Configuration**
   - Create file: `public_html/.htaccess`
   - Add this content:
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
   - **Why?** React is a SPA. All routes must point to index.html for the browser to handle routing.

4. **Enable GZIP Compression (Optional but Recommended)**
   - In `.htaccess`, add:
   ```apache
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/plain text/xml
     AddOutputFilterByType DEFLATE text/css
     AddOutputFilterByType DEFLATE application/javascript application/x-javascript
   </IfModule>
   ```

5. **Test**
   - Visit: https://your-domain.com
   - Demo should load and be interactive
   - Test on mobile devices
   - Check browser console (F12) for errors

**Performance Notes:**
- Expected load time: 1-3 seconds
- Size: ~2-3 MB on first load
- Subsequent loads cached by browser
- Images: Served inline, all included in build/

---

### Option 2: Vercel (Cloud Hosting - Recommended Alternative)

**Easiest deployment option. Zero configuration.**

1. Go to https://vercel.com
2. Click "New Project"
3. Connect GitHub account
4. Select repository
5. Click "Deploy"
6. Live URL provided automatically
7. Automatic deployments on every GitHub push

**Features:**
- Automatic HTTPS
- CDN distribution
- Preview URLs
- Zero downtime deployments
- Free tier available

---

### Option 3: Netlify (Cloud Hosting - Alternative)

**Also very easy, good alternative to Vercel.**

1. Go to https://netlify.com
2. Click "New Site from Git"
3. Select GitHub repository
4. **Build Command:** `npm run build`
5. **Publish Directory:** `build`
6. Click "Deploy"
7. Live URL provided automatically

**Features:**
- Automatic SSL/HTTPS
- Global CDN
- Environment variables support
- Free tier available

---

### Option 4: AWS S3 + CloudFront (Enterprise)

**For large-scale deployments:**

1. Create S3 bucket
2. Enable static website hosting
3. Upload contents of `build/` folder
4. Create CloudFront distribution
5. Point domain to CloudFront
6. Configure HTTPS

**Cost:** $5-20/month  
**Complexity:** Moderate  
**Scalability:** Very high  

---

## Post-Deployment Checklist

- [ ] Website loads at correct URL
- [ ] All demo steps display correctly
- [ ] Navigation buttons work (← →)
- [ ] Keyboard shortcuts work (arrow keys)
- [ ] Images load properly
- [ ] Responsive on mobile/tablet
- [ ] No JavaScript errors in console
- [ ] Page title visible
- [ ] Favicon displays
- [ ] Links work correctly
- [ ] Completion banner animates

---

## Troubleshooting

### Issue: "404 Not Found" on page reload
**Cause:** Missing `.htaccess` configuration  
**Solution:** Add `.htaccess` file with rewrite rules (see Option 1, step 3)

### Issue: Images not loading
**Cause:** Images in build folder not uploaded  
**Solution:** Ensure ALL files from build/ are uploaded, including PNG images

### Issue: White blank page
**Cause:** JavaScript error or build incomplete  
**Solution:** 
- Check browser console (F12) for errors
- Verify all files in build/ are uploaded
- Ensure index.html is in root directory

### Issue: Slow loading
**Cause:** GZIP compression not enabled  
**Solution:** Enable GZIP in .htaccess or server config

### Issue: "Cannot GET /some-route"
**Cause:** .htaccess not working  
**Solution:** 
- Verify mod_rewrite is enabled (ask host)
- Check .htaccess is in correct location
- Check .htaccess syntax

---

## Updating the Demo

**When the developer team wants to update:**

1. Developer edits source code
2. Developer runs: `npm run build`
3. New `build/` folder created
4. Upload new `build/` contents to server (same process as initial deployment)
5. Flush browser cache (Ctrl+Shift+R)
6. Done!

**Update frequency:** As needed (typically quarterly for product updates)

---

## Performance & Monitoring

### Expected Metrics:
- **Page Load Time:** 1-3 seconds (first load)
- **Subsequent Loads:** < 500ms (cached)
- **Total Size:** ~2-3 MB
- **Concurrent Users:** Unlimited (static content)
- **Bandwidth:** ~500MB-1GB per month per 1000 users

### Monitoring Tools:
- **Google Analytics:** Track user engagement
- **Hotjar:** Session recordings, heatmaps
- **Pingdom/Uptime Robot:** Uptime monitoring
- **GTmetrix:** Performance analysis

### Optimization Tips:
- Enable GZIP compression
- Use CDN if available
- Set browser caching headers
- Monitor 404 errors
- Check JavaScript console errors

---

## Security Notes

### This Demo Is Safe Because:
- ✅ No backend server
- ✅ No database
- ✅ No user data collection
- ✅ Static files only
- ✅ No API calls to sensitive systems
- ✅ No authentication required

### Security Recommendations:
- Enable HTTPS (SSL certificate)
- Set appropriate CORS headers
- Add security headers (CSP, X-Frame-Options)
- Monitor access logs for unusual activity
- Keep server patched and updated

---

## File Size Reference

| Component | Size |
|-----------|------|
| Main JavaScript | 53.09 kB (gzipped) |
| CSS | < 1 KB |
| Images | ~1.5 MB |
| **Total** | **~2-3 MB** |

All sizes are compressed for transmission.

---

## Support & Contact

**For Technical Issues:**
- Check troubleshooting section above
- Review browser console (F12)
- Test with a different browser
- Clear browser cache (Ctrl+Shift+R)

**For Questions:**
- Contact development team
- Reference: React SPA, static deployment
- Provide browser/OS version in reports

---

## Key Points for Hosting Team

1. **No Backend Required** - This is purely frontend
2. **No Database** - All data is hardcoded in JS
3. **No Server Runtime** - Just serve static files
4. **.htaccess Required** - For React routing to work
5. **GZIP Recommended** - For performance
6. **CDN Optional** - But recommended for speed
7. **HTTPS Recommended** - For security

---

## Deployment Recommendation

**For your team:**

| Scenario | Recommended |
|----------|-------------|
| Using existing cPanel | Use **Option 1** |
| Want easiest setup | Use **Vercel** |
| Want open-source alternative | Use **Netlify** |
| Large scale, many demos | Use **AWS** |

**Our Recommendation:** **Vercel** if possible (easiest) or **cPanel** if already available.

---

## Next Steps

1. Choose deployment option (see above)
2. Follow deployment instructions
3. Test thoroughly
4. Monitor performance
5. Set up analytics if desired
6. Document your deployment process

---

**Document Version:** 1.0  
**Last Updated:** November 24, 2025  
**Contact:** Development Team
