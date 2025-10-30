# 🔧 API Key Permission Issue

## Problem
Your current API key doesn't have READ and WRITE permissions.

## Quick Fix (2 minutes):

### Step 1: Create a New API Key with Full Permissions
1. Go to: https://jsonbin.io
2. Log in to your account
3. Click your **profile icon** (top right)
4. Click **"API Keys"**
5. Click **"Create Access Key"**
6. Configure the key:
   - **Name**: `Burial Society Full Access`
   - **Permissions**: 
     - ✅ Check "Read"
     - ✅ Check "Write"
7. Click **"Create"**
8. **COPY THE NEW API KEY** (it will look like: `$2a$10$...`)

### Step 2: Update the Code
Open `index.html` and find line ~515:

**Replace this line:**
```javascript
apiKey: '$2a$10$c9XoB5lx9EbwgAWr984NE.2JRRbxb51.gEAImXGSchw0E7uXcxkhK',
```

**With your NEW API key:**
```javascript
apiKey: 'YOUR_NEW_API_KEY_HERE',
```

### Step 3: Tell Me When Done
Once you've replaced it, just say "done" and I'll:
1. Test the connection
2. Deploy to GitHub
3. Verify cross-browser sync is working

---

## Alternative: Quick Test
If you want to test first, paste your new API key here and I'll verify it works before deploying.
