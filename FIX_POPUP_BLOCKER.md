# Fix Popup Blocker for Google Calendar Connection

## The Problem
Your browser is blocking the Google Calendar sign-in popup. You'll see an error like:
```
[GSI_LOGGER]: Failed to open popup window... Maybe blocked by the browser?
```

## Quick Fix

### Chrome/Edge:
1. Look at the address bar - you should see a popup blocker icon (🚫 or 🛡️)
2. Click on it
3. Select "Always allow popups and redirects from localhost:5174"
4. Click "Done"
5. Try connecting again

### Firefox:
1. Look at the address bar - you should see a popup blocker icon
2. Click on it
3. Select "Allow popups for this site"
4. Try connecting again

### Safari:
1. Go to Safari → Settings → Websites → Pop-up Windows
2. Find `localhost:5174`
3. Change it to "Allow"
4. Try connecting again

## Alternative: Allow Popups in Browser Settings

### Chrome/Edge:
1. Click the three dots (⋮) → Settings
2. Go to "Privacy and security" → "Site settings"
3. Click "Pop-ups and redirects"
4. Under "Allowed to send pop-ups and use redirects", click "Add"
5. Enter: `http://localhost:5174`
6. Click "Add"
7. Refresh the page and try connecting

### Firefox:
1. Click the menu (☰) → Settings
2. Go to "Privacy & Security"
3. Under "Permissions", find "Block pop-up windows"
4. Click "Exceptions..."
5. Enter: `http://localhost:5174`
6. Click "Allow" → "Save Changes"
7. Refresh the page and try connecting

## After Allowing Popups

1. **Refresh the page** (F5 or Ctrl+R)
2. Click the **"Connect"** button
3. The Google sign-in popup should now appear
4. Sign in and grant permissions
5. Your calendar should connect successfully!

## Still Not Working?

- Make sure you're using `http://localhost:5174` (not `https://`)
- Try a different browser
- Check if any browser extensions are blocking popups
- Try incognito/private mode

