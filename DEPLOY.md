# Deploy to Vercel (Production)

Your form is ready to deploy! Follow these steps:

## Option A: Deploy via Vercel Dashboard (Easiest)

1. Go to [Vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New...** → **Project**
3. Select **"lead-capture-form"** repository
4. Click **Import**
5. In the **Environment Variables** section, add:
   ```
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL = https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent
   ```
6. Click **Deploy**
7. Wait ~2 minutes for build to complete
8. Your form is now live! 🎉

**Your URL will be:** `https://lead-capture-form.vercel.app`

---

## Option B: Deploy via Vercel CLI

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
cd /home/yash/.openclaw/workspace/lead-capture-form
vercel --prod

# 4. When prompted, add environment variable:
# NEXT_PUBLIC_GOOGLE_SCRIPT_URL = <your-apps-script-url>
```

---

## After Deployment

1. **Test your form:**
   - Open your live URL
   - Fill in test data
   - Submit
   - Check Google Sheet for the entry

2. **Share the form:**
   - You can now send the link to anyone
   - They can submit leads directly
   - All data goes to your Google Sheet

3. **Monitor submissions:**
   - Refresh your Google Sheet to see new entries
   - Data is captured in real-time

---

## Environment Variables Reference

Once deployed, you can update environment variables in Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **lead-capture-form** project
3. Click **Settings**
4. Go to **Environment Variables**
5. Add/edit `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
6. Click **Save**
7. Vercel will auto-redeploy

---

## Custom Domain (Optional)

If you want a custom domain instead of `vercel.app`:

1. In Vercel Dashboard, go to your project → **Settings**
2. Click **Domains**
3. Enter your domain name (e.g., `leadform.yourdomain.com`)
4. Follow DNS instructions
5. Takes 5-10 minutes to activate

---

## Monitoring

- **Vercel Dashboard**: [https://vercel.com/dashboard](https://vercel.com/dashboard)
- Check deployments, logs, and analytics
- View build history

---

## Troubleshooting After Deploy

### Form not submitting?
- Check `.env` shows your Apps Script URL
- Verify Apps Script is deployed as "Web app"

### No entries in Google Sheet?
- Check browser console (F12) for errors
- Verify Apps Script URL is correct
- Test in browser DevTools Network tab

### Form looks broken?
- Clear browser cache (Ctrl+Shift+Delete)
- Reload the page
- Check Vercel build logs

---

**You're all set!** 🚀

Your lead capture form is now live and collecting data.
