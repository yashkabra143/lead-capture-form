# Quick Setup Guide

Follow these steps to get your lead capture form running:

## Step 1: Clone & Install (2 minutes)

```bash
cd /home/yash/.openclaw/workspace/lead-capture-form
npm install
```

## Step 2: Create Google Sheet (3 minutes)

1. Go to [Google Drive](https://drive.google.com)
2. Click **+ New** → **Google Sheets**
3. Name it: **"Lead Capture Form"**
4. In the first row, add these headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Phone`
   - D1: `Category`

## Step 3: Create Google Apps Script (3 minutes)

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete all existing code
3. Paste this code:

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

4. Click **▶ Run** (allow permissions)
5. Click **Deploy** → **New Deployment**
6. Select **Type**: "Web app"
7. **Execute as**: Your Google Account
8. **Who has access**: "Anyone"
9. Click **Deploy**
10. **Copy the URL** that appears (something like `https://script.google.com/macros/d/ABC123.../usercontent`)

## Step 4: Update .env.local (1 minute)

Edit `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent
```

Paste your actual URL from Step 3.

## Step 5: Test Locally (2 minutes)

```bash
npm run dev
```

Open http://localhost:3000 in your browser and test the form.

## Step 6: Deploy to Vercel (2 minutes)

```bash
npm install -g vercel
vercel
```

Follow the prompts. Your form will be live!

---

**Total time: ~15 minutes** ✓

Then every submission automatically goes to your Google Sheet!
