# 🏢 Managing Multiple Demos - Team Guide

**Document Purpose:** How to manage and maintain multiple product demos as your company grows  
**Audience:** Your senior, team members, DevOps team  
**Date:** November 24, 2025

---

## Current Situation

You now have **1 production demo:**
- ✅ Bank PDF Demo (27 steps) - LIVE

**Future Scenario:**
You'll likely need demos for other modules:
- Invoicing
- Auto-Mapping
- Accounting
- GST Management
- etc.

This guide explains how to manage multiple demos efficiently without duplication.

---

## Strategy 1: Separate Projects (Simplest)

**How it works:**
- Each module gets its own complete project
- Each has own `src/`, `package.json`, `build/`
- Each deployed independently
- Each updated independently

**Folder Structure:**
```
projects/
├── tally-demo-bank-pdf/          ← Current (LIVE)
│   ├── src/
│   ├── build/                    ← What's deployed
│   ├── package.json
│   └── HOSTING_INSTRUCTIONS.md
├── tally-demo-invoicing/         ← Future project 1
│   ├── src/
│   ├── build/
│   ├── package.json
│   └── HOSTING_INSTRUCTIONS.md
├── tally-demo-accounting/        ← Future project 2
│   ├── src/
│   ├── build/
│   ├── package.json
│   └── HOSTING_INSTRUCTIONS.md
└── tally-demo-auto-mapping/      ← Future project 3
    ├── src/
    ├── build/
    ├── package.json
    └── HOSTING_INSTRUCTIONS.md
```

**Pros:**
- ✅ Simple to understand
- ✅ Easy to deploy
- ✅ Independent updates
- ✅ No shared dependencies
- ✅ Easy to version control

**Cons:**
- ❌ Code duplication (4-5 KB per project)
- ❌ More folders to maintain
- ❌ Same update process repeated

**Deployment:**
```
Demo 1 → https://yourdomain.com/bank-pdf
Demo 2 → https://yourdomain.com/invoicing
Demo 3 → https://yourdomain.com/accounting
Demo 4 → https://yourdomain.com/auto-mapping
```

**Best For:** Your current situation (1-3 demos)

---

## Strategy 2: Shared Components (Scalable)

**How it works:**
- Shared components in central location
- Each demo pulls from shared components
- Each module customizes only `demoSteps.js`
- Reduces code duplication

**Folder Structure:**
```
projects/
├── shared-components/            ← Reusable UI
│   ├── src/
│   │   ├── components/           ← DemoEngine, Tooltip, etc.
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── styles/
│   │   └── index.js              ← Exports everything
│   ├── package.json
│   └── README.md
├── tally-demo-bank-pdf/          ← Minimal project
│   ├── src/
│   │   ├── data/demoSteps.js     ← ONLY this changes
│   │   ├── assets/screens/       ← Module-specific
│   │   ├── App.jsx               ← Uses shared DemoEngine
│   │   └── index.js
│   ├── build/
│   ├── package.json
│   └── setupProxy.js
├── tally-demo-invoicing/
│   ├── src/
│   │   ├── data/demoSteps.js     ← ONLY this changes
│   │   └── ... (same structure)
│   └── ...
└── tally-demo-accounting/
    └── ... (same pattern)
```

**Pros:**
- ✅ No code duplication
- ✅ Consistent UI across all demos
- ✅ Update once, apply everywhere
- ✅ Professional structure
- ✅ Easy to add new demos (5 minutes)

**Cons:**
- ❌ Requires initial setup
- ❌ Shared component updates affect all demos
- ❌ Need version control discipline

**How to Create New Demo (5 minutes):**
```bash
# 1. Clone existing demo as template
cp -r tally-demo-bank-pdf tally-demo-invoicing

# 2. Update demoSteps.js with new steps
# Edit: src/data/demoSteps.js

# 3. Add new screenshots
# Copy to: src/assets/screens/

# 4. Build and deploy
npm run build
# Upload build/ to server
```

**Best For:** When you have 3+ demos

---

## Strategy 3: Monorepo with Turborepo (Enterprise)

**How it works:**
- Single Git repository
- Multiple projects managed together
- Shared dependencies resolved once
- Automated build pipeline

**Folder Structure:**
```
tally-demos/                       ← Single repo
├── packages/
│   ├── shared-components/
│   │   ├── src/
│   │   └── package.json
│   ├── demo-bank-pdf/
│   │   ├── src/
│   │   └── package.json
│   ├── demo-invoicing/
│   │   └── ...
│   └── demo-accounting/
│       └── ...
├── turbo.json                    ← Build configuration
├── package.json                  ← Root config
└── .github/
    └── workflows/                ← CI/CD automation
```

**Pros:**
- ✅ Professional structure
- ✅ Automated deployments
- ✅ Centralized dependency management
- ✅ Efficient builds
- ✅ Great for large teams

**Cons:**
- ❌ Complex setup (1-2 days)
- ❌ Requires DevOps knowledge
- ❌ Overkill for simple demos

**Best For:** Enterprise with 5+ demos and dedicated DevOps team

---

## Recommended Path for Your Team

### Phase 1: NOW (Current - 1 Demo)
**Use Strategy 1: Separate Projects**
- Bank PDF demo ready to deploy
- Keep it simple
- No shared code needed yet

### Phase 2: NEXT (2-3 Demos Expected)
**Move to Strategy 2: Shared Components**
- Extract reusable components
- Create shared-components folder
- New demos reference shared components
- Takes 2-3 hours to setup once
- Then very quick to add new demos

### Phase 3: LATER (5+ Demos, Large Team)
**Consider Strategy 3: Monorepo**
- Only if you have dedicated DevOps team
- Requires CI/CD expertise
- Professional enterprise setup

---

## Implementation Guide - Moving to Shared Components (When Ready)

### When to Do This?
- When you're about to create demo #2
- When senior asks "can we make these reusable?"
- When you realize you're copying code again

### Step-by-Step Migration

**1. Create shared-components folder:**
```bash
mkdir shared-components
mkdir shared-components/src
mkdir shared-components/src/components
mkdir shared-components/src/hooks
mkdir shared-components/src/utils
mkdir shared-components/src/styles
```

**2. Copy reusable components:**
```bash
# From tally-demo-bank-pdf to shared-components:
cp src/components/DemoEngine.jsx shared-components/src/components/
cp src/components/NavigationBar.jsx shared-components/src/components/
cp src/components/Tooltip.jsx shared-components/src/components/
# ... copy other components
cp src/styles/animations.css shared-components/src/styles/
```

**3. Create shared package.json:**
```json
{
  "name": "tally-shared-components",
  "version": "1.0.0",
  "description": "Shared demo components",
  "main": "src/index.js",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

**4. Update existing demo to use shared:**
```javascript
// Old way:
import DemoEngine from "./components/DemoEngine";

// New way (still local, but we'll reference from shared):
import { DemoEngine } from "../shared-components/src";
```

**5. For new demos - just change demoSteps.js:**
```
Create new-demo/
├── src/
│   ├── data/demoSteps.js    ← ONLY change this
│   ├── assets/screens/       ← Add screenshots
│   ├── App.jsx               ← Same as others
│   └── index.js              ← Same as others
├── build/
├── package.json              ← Copy from existing
└── setupProxy.js             ← Copy from existing
```

**Time Required:** 2-3 hours one-time setup, then 5 minutes per new demo

---

## Deployment Strategy for Multiple Demos

### Subdirectory Approach (Recommended)

**Structure:**
```
yourdomain.com/
├── (main website)
├── /bank-pdf/                ← Demo 1
├── /invoicing/               ← Demo 2
├── /auto-mapping/            ← Demo 3
└── /accounting/              ← Demo 4
```

**Implementation:**
```
1. Create folder: public_html/bank-pdf/
2. Upload build/ contents there
3. Create public_html/invoicing/
4. Upload next demo's build/ there
5. Each has own .htaccess
```

**Accessing:**
- https://yourdomain.com/bank-pdf/
- https://yourdomain.com/invoicing/
- https://yourdomain.com/auto-mapping/

---

### Subdomain Approach (Alternative)

**Structure:**
```
bank-pdf-demo.yourdomain.com/
invoicing-demo.yourdomain.com/
auto-mapping-demo.yourdomain.com/
accounting-demo.yourdomain.com/
```

**Pros:**
- ✅ Each demo on own domain
- ✅ Analytics separate
- ✅ No URL path issues

**Cons:**
- ❌ Need multiple DNS records
- ❌ More setup with hosting team
- ❌ Harder to manage

**Only use if:**
- You have many demos (5+)
- Each needs independent tracking
- You have dedicated DevOps team

---

## Team Responsibilities

### Your Role (Developer)
- Maintain `src/` code
- Create demoSteps.js for new demos
- Test locally before deploying
- Document changes
- Prepare build/ folder

### Senior/PM Role
- Approve demo content
- Decide when to deploy
- Collect user feedback
- Plan updates
- Request new demos

### Hosting/DevOps Role
- Upload files to server
- Configure .htaccess
- Monitor uptime
- Manage DNS/domains
- Performance optimization
- Backup strategy

### QA/Testing Role
- Test demo on live site
- Test on various devices/browsers
- Report bugs
- Verify all steps work
- Check user experience

---

## Standard Operating Procedure (SOP)

### For Creating New Demo

**Step 1: Planning (Senior)**
- Decide which module needs demo
- Set deadline
- Approve step outline

**Step 2: Development (You)**
- Copy existing demo as template
- Update demoSteps.js
- Add screenshots to assets/
- Create demoSteps.js with 20-30 steps
- Test locally: `npm start`
- Build: `npm run build`

**Step 3: Review (Senior)**
- Review demo steps
- Approve content
- Check for accuracy

**Step 4: Testing (QA)**
- Test all steps
- Test on different devices
- Report any issues
- Approve for deployment

**Step 5: Deployment (Hosting Team)**
- Receive build/ folder
- Upload to server
- Configure URLs
- Test on live

**Step 6: Launch (Senior)**
- Promote to users
- Share URL
- Collect feedback

**Step 7: Maintenance (You)**
- Monitor user feedback
- Fix issues
- Plan improvements
- Update quarterly

**Total Time:** 2-3 weeks per demo (mostly planning, actual coding is 5-8 hours)

---

## Version Management

### For Single Demo (Current Approach)
```
build/ folder  ← Latest
backup-build-v1.0/ ← Previous (keep 2-3 versions)
backup-build-v0.9/ ← Previous
```

### For Multiple Demos with Git
```
Git Repository:
main branch
  ├── commit: "Initial bank PDF demo"
  ├── commit: "Add invoicing demo"  
  ├── commit: "Update bank PDF steps"
  └── commit: "Add auto-mapping demo"

Tags (mark versions):
v1.0 ← Production versions
v1.1
v1.2
```

### Release Process
```
1. Create feature branch: git checkout -b feature/update-steps
2. Make changes
3. Test locally
4. Commit: git commit -m "feat: update bank PDF steps"
5. Create PR (Pull Request)
6. Code review
7. Merge to main
8. Tag version: git tag v1.1
9. Deploy: Run `npm run build`, upload build/
10. Done!
```

---

## Monitoring & Analytics

### What to Track

**For Each Demo:**
1. **Usage Metrics**
   - Page views
   - Unique visitors
   - Session duration
   - Completion rate

2. **Performance Metrics**
   - Page load time
   - Time to interactive
   - Error rate

3. **User Behavior**
   - Which steps users complete
   - Where they drop off
   - Time per step
   - Device types

### Tools to Use

**Free Options:**
- Google Analytics (free forever)
- Hotjar (free heatmaps)
- Vercel Analytics (if using Vercel)

**Paid Options:**
- Mixpanel (advanced analytics)
- Amplitude (user behavior)
- Datadog (enterprise monitoring)

### Setting Up Google Analytics

```javascript
// Add to public/index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Then:
- Create Google Analytics account
- Get measurement ID
- Replace GA_MEASUREMENT_ID above
- Deploy
- Track users in Analytics dashboard

---

## Scaling Considerations

### When You Have 3+ Demos
- Consolidate to shared components
- Create template project
- Document demoSteps.js format

### When You Have 5+ Demos
- Consider monorepo approach
- Set up CI/CD pipeline
- Automate deployments
- Use version management

### When You Have 10+ Demos
- Full enterprise setup
- Dedicated DevOps team
- Design system approach
- Component library

---

## Quick Decision Matrix

| Situation | Solution | When |
|-----------|----------|------|
| 1 demo, just going live | Strategy 1 (Separate) | NOW |
| Need to create demo #2 | Stay with Strategy 1 | Until 3 demos |
| Have 3 demos or more | Move to Strategy 2 (Shared) | Next project |
| Team growing, many demos | Monorepo (Strategy 3) | Hire DevOps person |

---

## Key Principles

1. **Don't Repeat Yourself (DRY)**
   - Share common components
   - Reuse styles and utilities
   - Avoid code duplication

2. **Keep It Simple**
   - Start with simple approach
   - Scale as you grow
   - Don't over-engineer early

3. **Document Everything**
   - demoSteps.js comments
   - README for each demo
   - Deployment procedures

4. **Test Before Deploy**
   - Local testing (npm start)
   - Device testing (mobile/tablet)
   - Browser testing (Chrome, Firefox, Safari, Edge)

5. **Have a Rollback Plan**
   - Keep previous builds
   - Know how to revert quickly
   - Test before deploying to production

---

## Checklist - Ready to Scale

- [ ] Current demo is live and working
- [ ] You understand the codebase
- [ ] You can modify demoSteps.js
- [ ] You can create production build
- [ ] You understand deployment process
- [ ] Documentation is up to date
- [ ] Team understands how to request updates
- [ ] Backup strategy in place
- [ ] Monitoring set up (analytics)
- [ ] Version control working smoothly

---

## Next Steps

### Immediate (Today)
1. Get bank PDF demo live ✅
2. Ensure it works on live site
3. Share documentation with team

### Short Term (This Month)
1. Collect user feedback
2. Track usage metrics
3. Plan improvements
4. Communicate success to senior

### Medium Term (Next 3 Months)
1. Prepare for second demo
2. Plan which module is next
3. Review and improve bank PDF based on feedback
4. Start planning invoicing demo

### Long Term (As You Scale)
1. Evaluate shared components approach
2. Build standard template
3. Establish team processes
4. Scale to 5+ demos

---

## Summary

**Your Path Forward:**

```
Now: 1 Demo (Live)
    ↓
3 Months: 2-3 Demos (Consider Shared Components)
    ↓
6 Months: 3-5 Demos (Implement Shared Components)
    ↓
1 Year: 5+ Demos (Professional Management System)
    ↓
2 Years: Enterprise Setup (Monorepo, CI/CD, Team)
```

Start simple, scale as needed. Don't over-engineer initially.

---

**Ready to manage demos professionally? You've got this! 🚀**

For specific questions, refer to other documentation:
- `HOSTING_INSTRUCTIONS.md` - Deployment details
- `DEPLOYMENT_GUIDE.md` - Full deployment guide
- `README.md` - Project overview
- `QUICK_DEPLOYMENT.md` - Quick reference

