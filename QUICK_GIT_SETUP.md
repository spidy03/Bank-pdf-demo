# 🚀 Git Setup - Quick Guide

**Time Required:** 5-10 minutes  
**Difficulty:** Very Easy  
**Result:** Your code tracked & ready for team collaboration

---

## 📋 STEP-BY-STEP GIT SETUP

### **Step 1: Navigate to Your Project**
```powershell
cd C:\tally-demo-option1
```

### **Step 2: Initialize Git Repository**
```powershell
git init
```

**What it does:** Creates `.git` folder to track changes

### **Step 3: Check .gitignore File**
```powershell
cat .gitignore
```

**Should contain:**
```
node_modules/
.env
.DS_Store
npm-debug.log*
```

(If file doesn't exist or is empty, see "Create .gitignore" section below)

### **Step 4: Add All Files to Git**
```powershell
git add .
```

**What it does:** Stages all files for commit

### **Step 5: Create Initial Commit**
```powershell
git commit -m "Initial commit: Tally Bank PDF Demo - 27 steps, production ready"
```

**What it does:** Saves first version with message

### **Step 6: Verify Git Setup**
```powershell
git log
```

**Expected output:** Shows your commit with timestamp

---

## ✅ Done! You Have Git

Your project is now tracked in Git! ✅

---

## 🔄 FUTURE: Making Updates

### **After You Make Changes**

**1. Check what changed:**
```powershell
git status
```

**2. View the changes:**
```powershell
git diff src/data/demoSteps.js
```

**3. Add changes:**
```powershell
git add .
```

**4. Commit with message:**
```powershell
git commit -m "feat: update demo steps for new module features"
```

**5. View history:**
```powershell
git log
```

---

## 📚 COMMON COMMIT MESSAGES

```powershell
# Update demo steps
git commit -m "feat: update bank PDF demo steps"

# Fix a bug
git commit -m "fix: correct tooltip positioning on mobile"

# Add screenshots
git commit -m "docs: add screenshots for new steps"

# Update styles
git commit -m "style: improve animation timing"

# Update documentation
git commit -m "docs: update deployment guide"
```

---

## 🌐 OPTIONAL: Push to GitHub (For Team Access)

### **If You Want Your Code on GitHub**

**1. Create GitHub Account:**
- Go to https://github.com
- Sign up (if not already done)

**2. Create New Repository:**
- Click "+" → "New repository"
- Name it: `tally-demo-bank-pdf`
- **Don't** check "Initialize with README"
- Click "Create repository"

**3. Connect Local Git to GitHub:**

Copy the commands from GitHub and run them:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/tally-demo-bank-pdf.git
git branch -M main
git push -u origin main
```

**Replace** `YOUR_USERNAME` with your actual GitHub username

**4. Done!**
Your code is now on GitHub ✅

---

## 📊 WHAT EACH GIT COMMAND DOES

| Command | What It Does |
|---------|------------|
| `git init` | Create new repository |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Save changes with message |
| `git status` | See what changed |
| `git log` | See all commits |
| `git diff file.js` | See detailed changes |
| `git remote add origin URL` | Connect to GitHub |
| `git push -u origin main` | Upload to GitHub |
| `git pull` | Download latest from GitHub |

---

## ✨ RECOMMENDED WORKFLOW

### **For Solo Work (Just You)**
```powershell
# Day 1: Make changes
# Edit src/data/demoSteps.js
# Add new screenshots

# Check changes
git status

# Commit
git add .
git commit -m "feat: update demo steps for invoicing module"

# Build and deploy
npm run build
# Upload build/ to hosting
```

### **For Team Collaboration**
```powershell
# Day 1: Create feature branch
git checkout -b feature/update-steps

# Make changes
# Edit src/data/demoSteps.js

# Commit
git add .
git commit -m "feat: update demo steps"

# Push to GitHub
git push origin feature/update-steps

# On GitHub: Create Pull Request
# Senior/Team: Review code
# Merge to main when approved
# Auto-deploy (if using Vercel)
```

---

## 🎯 WITH VERCEL: AUTOMATIC DEPLOYMENTS

If you use **Vercel + GitHub**:

```powershell
# 1. Push to GitHub
git push origin main

# 2. Vercel automatically:
#    ✓ Detects changes
#    ✓ Runs build (npm run build)
#    ✓ Deploys new version
#    ✓ Updates live website

# Result: Your changes go live automatically! ✅
```

**No manual upload needed!**

---

## 🏷️ VERSION TAGGING (Optional)

### **Mark Important Versions**

```powershell
# After successful deploy, tag version
git tag v1.0
git push origin v1.0

# Next update
git tag v1.1
git push origin v1.1

# See all versions
git tag
```

---

## 🔙 UNDO MISTAKES (If Needed)

### **Undo Last Commit (Before Push)**
```powershell
git reset --soft HEAD~1
```

### **Undo Last Commit (Including Changes)**
```powershell
git reset --hard HEAD~1
```

### **See Old Versions**
```powershell
git log --oneline
```

### **Checkout Old Version**
```powershell
git checkout COMMIT_HASH
```

---

## ⚠️ IMPORTANT: Don't Commit These

Your `.gitignore` should include:

```
# Dependencies
node_modules/
npm-debug.log*

# Environment
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/settings.json
.idea/

# Build (optional - you can commit build/ if you want)
# build/
```

---

## 🎓 GIT CONCEPTS EXPLAINED

### **Repository (Repo)**
- Your project folder tracked by Git
- Contains `.git` folder
- Stores all versions

### **Commit**
- A saved version with a message
- Like a checkpoint you can return to
- Has unique ID (hash)

### **Branch**
- Parallel version of code
- Use for features/fixes
- Merge back when done

### **Remote**
- GitHub/GitLab server copy
- Backup of your code
- Team can access

### **Push**
- Upload commits to GitHub
- Make changes visible to others
- Backup your work

---

## 📋 QUICK CHECKLIST

After following steps above:

- [x] `git init` ✅
- [x] Check `.gitignore` ✅
- [x] `git add .` ✅
- [x] `git commit -m "..."` ✅
- [x] `git log` (verify) ✅
- [ ] (Optional) Create GitHub account
- [ ] (Optional) `git push` to GitHub

---

## 🚀 NEXT: CHOOSE DEPLOYMENT

After Git setup, follow your deployment guide:
- **HOSTING_INSTRUCTIONS.md** → Choose Vercel/cPanel/Netlify

### **With Vercel:**
```
git push → Vercel auto-builds → Auto-deploys → LIVE!
```

### **With cPanel:**
```
git commit → npm run build → Upload build/ → LIVE!
```

---

## 💡 BEST PRACTICE

**Always commit before deploying:**

```powershell
# Make changes
# Test locally with: npm start

# Then commit
git add .
git commit -m "feat: description of changes"

# Then deploy
npm run build
# Upload or push to hosting
```

This way:
- Changes are tracked ✅
- You can rollback if needed ✅
- Team can see history ✅
- Professional approach ✅

---

## 📞 TROUBLESHOOTING

### **Error: "fatal: not a git repository"**
**Solution:** Make sure you're in the project folder:
```powershell
cd C:\tally-demo-option1
git init
```

### **Error: "git is not recognized"**
**Solution:** Install Git from https://git-scm.com

### **Want to reset everything and start over:**
```powershell
rm -r .git
git init
git add .
git commit -m "Initial commit"
```

---

## 🎉 YOU'RE DONE!

Your Git setup is complete! ✅

**Next steps:**
1. Read: **HOSTING_INSTRUCTIONS.md**
2. Choose: Deployment option
3. Deploy: Your demo goes live!
4. Update: Use Git to track changes

---

**Summary:**
```
git init                    (create repo)
git add .                   (stage files)
git commit -m "msg"         (save version)
git log                     (view history)

Optional:
git push                    (upload to GitHub)
git pull                    (download updates)
git tag v1.0                (mark version)
```

That's it! Simple and powerful! 🚀
