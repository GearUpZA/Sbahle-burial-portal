# Cloud Storage Setup Guide

## Problem Found ❌
The cloud storage was configured with an invalid API key and bin ID, which is why data wasn't syncing across browsers.

## Solution: Set Up Your Own JSONBin Storage (5 Minutes)

### Step 1: Create a Free JSONBin Account
1. Go to: **https://jsonbin.io**
2. Click **"Sign Up"** (top right)
3. Create account with your email
4. Verify your email

### Step 2: Create a New Bin
1. After logging in, click **"Create Bin"**
2. Paste this initial data:
```json
{
  "members": [],
  "beneficiaries": [],
  "payouts": [],
  "penalties": [],
  "memberIdCounter": 1,
  "attendance": {},
  "lastSaved": "2025-10-30T00:00:00.000Z",
  "version": "2.3-cloud"
}
```
3. Click **"Create"**
4. **COPY THE BIN ID** (it looks like: `673274c4ad19ca34f8c97cf8`)

### Step 3: Get Your API Key
1. Click your profile icon (top right)
2. Go to **"API Keys"**
3. Click **"Create Access Key"**
4. Name it: `Burial Society System`
5. **COPY THE API KEY** (starts with `$2a$10$...`)

### Step 4: Update Your System
1. Open `index.html` in VS Code
2. Find line ~512 (the CLOUD_STORAGE configuration)
3. Replace:
```javascript
const CLOUD_STORAGE = {
  enabled: false, // Change to true
  binId: 'YOUR_BIN_ID_HERE', // Paste your bin ID
  apiKey: 'YOUR_API_KEY_HERE', // Paste your API key
  endpoint: 'https://api.jsonbin.io/v3/b',
  syncInterval: 5000
};
```

With your actual values:
```javascript
const CLOUD_STORAGE = {
  enabled: true, // ← Changed to true
  binId: '673274c4ad19ca34f8c97cf8', // ← Your actual bin ID
  apiKey: '$2a$10$xxxxxxxxxxxxxxxxxxx', // ← Your actual API key
  endpoint: 'https://api.jsonbin.io/v3/b',
  syncInterval: 5000
};
```

### Step 5: Deploy to GitHub
```powershell
cd "C:\Users\mmaqashela\Downloads\SBS-V11 (1)\sbahle-burial-society"
git add .
git commit -m "Add working cloud storage credentials"
git push origin main
```

### Step 6: Test It!
1. Open in Browser A: https://GearUpZA.github.io/Sbahle-burial-portal
2. Open Console (F12) - should see: `✓ Cloud storage connected`
3. Register a new member
4. Open in Browser B after 5 seconds
5. New member should appear automatically! 🎉

## Alternative: Use localStorage Only (No Setup Needed)

If you don't want to set up cloud storage right now, the system will work fine with localStorage - **but data won't sync across different browsers/devices**.

The system is already configured to work this way by default (cloud storage is disabled).

## Free Plan Limits
- **100,000 requests/month** (more than enough!)
- **Unlimited bins**
- **Perfect for your burial society**

## Need Help?
If you have issues:
1. Check the browser console (F12) for error messages
2. Verify your API key is correct
3. Make sure the bin ID matches
4. Ensure `enabled: true` in the config

---

**Status**: Cloud storage is currently **DISABLED**. Follow the steps above to enable cross-browser sync!
