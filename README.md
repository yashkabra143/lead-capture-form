# Lead Capture Form with Google Sheets Integration

A modern, responsive form that captures Name, Phone Number, and Category — and automatically stores all submissions in Google Sheets.

## Features

✅ **3-Field Form**: Name, Phone, Category dropdown  
✅ **Real-time Validation**: Phone number must be 10 digits  
✅ **Google Sheets Integration**: Auto-save all submissions  
✅ **Mobile Responsive**: Works perfectly on all devices  
✅ **Modern UI**: Dark theme with Tailwind CSS  
✅ **Error Handling**: Clear validation messages  
✅ **No Database Needed**: Uses Google Sheets as your database  

---

## Quick Start (5 minutes)

### Step 1: Deploy Form to Vercel

```bash
cd lead-capture-form
npm install
vercel
```

Follow the Vercel prompts. Your form will be live at `https://lead-capture-form-[your-username].vercel.app`

### Step 2: Set Up Google Sheets Integration

#### 2A: Create a Google Sheet

1. Go to **Google Drive** → **New** → **Google Sheet**
2. Name it: `Lead Capture Form`
3. Create these column headers in Row 1:
   ```
   A1: Timestamp
   B1: Name
   C1: Phone
   D1: Category
   ```

#### 2B: Create Google Apps Script

1. Open your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Delete the default code and paste this:

```javascript
function doPost(e) {
  try {
    // Get the sheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse form data
    const timestamp = e.parameter.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const name = e.parameter.name;
    const phone = e.parameter.phone;
    const category = e.parameter.category;
    
    // Append to sheet
    sheet.appendRow([timestamp, name, phone, category]);
    
    // Return success
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy** → **New Deployment**
5. Select **Type**: "Web app"
6. **Execute as**: Your Google Account
7. **Who has access**: "Anyone"
8. Click **Deploy**
9. **Copy the Deployment URL** (looks like `https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent`)

#### 2C: Connect Form to Google Sheet

1. Open your deployed form
2. Edit `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent
```

3. Redeploy to Vercel:
```bash
vercel --prod
```

---

## Testing

### Test Submission

1. Go to your live form
2. Fill in:
   - **Name**: "John Doe"
   - **Phone**: "9876543210"
   - **Category**: "taxi"
3. Click **Submit**
4. Check your Google Sheet — the row should appear instantly!

### View Results

Go to your Google Sheet → you'll see:

| Timestamp | Name | Phone | Category |
|-----------|------|-------|----------|
| 15-03-2026 13:37 | John Doe | 9876543210 | taxi |
| 15-03-2026 13:45 | Jane Smith | 8765432109 | whatsapp |

---

## Form Fields

### 1. **Name** (Text Input)
- Required field
- Accepts any text
- Stored as-is

### 2. **Phone Number** (Text Input)
- Required field
- Validates 10-digit number
- Accepts formats: `9876543210` or `98-765-43210`
- Validation: `^\d{10}$`

### 3. **Category** (Dropdown)
Options:
- holding
- taxi
- Instagram
- whatsapp
- template

---

## Customization

### Change Form Fields

Edit `app/page.tsx`:

```typescript
const categories = ['holding', 'taxi', 'Instagram', 'whatsapp', 'template'];
```

To add a new field:
1. Add to `formData` state
2. Add to form JSX
3. Update Google Apps Script to capture new field

### Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: "#0f172a",
  secondary: "#1e293b",
  accent: "#f97316",
}
```

### Change Form Title

Edit `app/page.tsx`, line 51:
```typescript
<h1>Your New Title Here</h1>
```

---

## Troubleshooting

### "Form submission is not configured"
- ✗ You haven't set `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` in `.env.local`
- ✓ Go to Step 2B-2C above

### Submissions not appearing in Google Sheet
- ✗ Google Apps Script not deployed as "Web app"
- ✓ Check deployment settings (must be "Web app", not "Library")

### Phone validation error
- ✗ Phone number must be exactly 10 digits
- ✓ Remove formatting characters (dashes, spaces, +91)

### CORS Error in browser console
- ✓ This is normal! `mode: 'no-cors'` suppresses it
- The submission still works

---

## Production Checklist

- [ ] Google Sheet created and configured
- [ ] Apps Script deployed as Web app
- [ ] `.env.local` updated with Apps Script URL
- [ ] Form deployed to Vercel
- [ ] Test submission completed
- [ ] Results verified in Google Sheet

---

## Architecture

```
┌──────────────────┐
│   User Fills     │
│  React Form      │
└────────┬─────────┘
         │ (Form Data)
         ▼
┌──────────────────────────────┐
│ Validation                   │
│ - Name required             │
│ - Phone: 10 digits          │
│ - Category selected         │
└────────┬─────────────────────┘
         │ (Valid Data)
         ▼
┌──────────────────────────────┐
│ POST to Apps Script          │
│ /macros/d/.../usercontent    │
└────────┬─────────────────────┘
         │ (Form Submission)
         ▼
┌──────────────────────────────┐
│ Google Apps Script           │
│ - Parse data                 │
│ - Add timestamp              │
│ - Append to Sheet            │
└────────┬─────────────────────┘
         │ (Data Stored)
         ▼
┌──────────────────────────────┐
│ Google Sheet                 │
│ [Auto-saved rows]            │
└──────────────────────────────┘
```

---

## Support

Need help? Check:
1. `.env.local` has correct Apps Script URL
2. Apps Script is deployed as **Web app** (not Library)
3. Column headers match exactly (A1, B1, C1, D1)
4. Browser console for error messages

---

## License

MIT

---

**Built with Next.js, React, Tailwind CSS, and Google Sheets API**
