# Vercel Deployment Checklist

Follow this checklist step-by-step to deploy your form live.

---

## ✅ Pre-Deployment (Already Done!)

- [x] Code pushed to GitHub
- [x] vercel.json created
- [x] README.md with instructions
- [x] Next.js configured

**GitHub Repo**: https://github.com/yashkabra143/lead-capture-form

---

## 🚀 Deploy to Vercel (5 minutes)

### Step 1: Open Vercel Dashboard
```
👉 https://vercel.com/dashboard
```
Login with your GitHub account.

### Step 2: Import Project
- [ ] Click **"Add New..."** in top left
- [ ] Click **"Project"**
- [ ] Search for **"lead-capture-form"** repo
- [ ] Click **"Import"**

### Step 3: Configure Settings
- [ ] **Project Name**: `lead-capture-form` (auto-filled)
- [ ] **Framework Preset**: `Next.js` (auto-detected)
- [ ] **Root Directory**: `./` (default)
- [ ] **Build Command**: Auto-detected ✓
- [ ] **Output Directory**: Auto-detected ✓
- [ ] **Install Command**: Auto-detected ✓

### Step 4: Add Environment Variable
- [ ] Scroll down to **"Environment Variables"**
- [ ] Click **"Add Environment Variable"**
- [ ] Fill in:
  ```
  Key:   NEXT_PUBLIC_GOOGLE_SCRIPT_URL
  Value: (leave empty for now)
  ```
- [ ] Click **"Add"**

### Step 5: Deploy!
- [ ] Click **"Deploy"** button (blue, bottom right)
- [ ] Wait 2-3 minutes for build to complete
- [ ] See green ✓ "Successfully Deployed"

---

## ✨ After Deployment

### Your Live URL:
```
https://lead-capture-form-[your-username].vercel.app
```

OR check the deployment page — Vercel shows the exact URL.

---

## 📊 Next: Set Up Google Sheets

Once deployed, follow this to connect Google Sheets:

### Step 1: Create Google Sheet
- [ ] Go to [Google Drive](https://drive.google.com)
- [ ] Click **"+ New"** → **"Google Sheets"**
- [ ] Name it: `Lead Capture Form`
- [ ] Add headers in Row 1:
  ```
  A1: Timestamp
  B1: Name
  C1: Phone
  D1: Category
  ```

### Step 2: Create Google Apps Script
- [ ] In your sheet, click **"Extensions"** → **"Apps Script"**
- [ ] Delete all code, paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const timestamp = e.parameter.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const name = e.parameter.name;
    const phone = e.parameter.phone;
    const category = e.parameter.category;
    
    sheet.appendRow([timestamp, name, phone, category]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

- [ ] Click **"Run"** (grant permissions)
- [ ] Click **"Deploy"** → **"New Deployment"**
- [ ] Type: Select **"Web app"**
- [ ] Execute as: **Your Account**
- [ ] Who has access: **"Anyone"**
- [ ] Click **"Deploy"**
- [ ] **COPY the URL shown** (looks like `https://script.google.com/macros/d/ABC123/usercontent`)

### Step 3: Update Vercel Environment Variable
- [ ] Go back to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Click on **"lead-capture-form"** project
- [ ] Click **"Settings"**
- [ ] Go to **"Environment Variables"**
- [ ] Find `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
- [ ] Paste your Apps Script URL as value
- [ ] Click **"Save"**
- [ ] Click **"Redeploy"** (Vercel auto-redeploys)

---

## 🧪 Test Your Form

- [ ] Go to your live URL
- [ ] Fill in:
  - Name: `Test User`
  - Phone: `9876543210`
  - Category: `taxi`
- [ ] Click **"Submit"**
- [ ] Check your Google Sheet → Row should appear instantly!

---

## 🎉 You're Done!

Your form is now:
- ✅ Live on the internet
- ✅ Collecting data to Google Sheets
- ✅ Mobile responsive
- ✅ Auto-deploying on every GitHub push

**Share the live URL with anyone to collect leads!**

---

## 📞 Troubleshooting

### Form won't submit?
- Check Vercel environment variable is set
- Check browser console (F12) for errors

### No entries in Google Sheet?
- Verify Apps Script is deployed as "Web app" (not Library)
- Check Apps Script URL is correct in Vercel

### Build failed?
- Check Vercel build logs (Deployments → click failed build)
- Usually a Node/npm issue

---

## 🔄 Auto-Deploy Setup

Every time you push to GitHub:
```bash
git add .
git commit -m "Update form"
git push origin master
```

Vercel automatically rebuilds and deploys! ✅

---

**Total time: ~20 minutes to go live!** 🚀
