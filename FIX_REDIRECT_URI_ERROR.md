# Fix: Error 400: redirect_uri_mismatch

## Quick Fix Steps

1. **Check your Vite dev server port**
   - Look at your terminal where `npm run dev` is running
   - Note the port number (usually `5173` or `5174`)

2. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/apis/credentials
   - Click on your OAuth 2.0 Client ID

3. **Update Authorized JavaScript origins**
   - Add: `http://localhost:5173` (use your actual port number)
   - If using a different port, add that too

4. **Update Authorized redirect URIs**
   - Add: `http://localhost:5173` (without trailing slash)
   - Add: `http://localhost:5173/` (with trailing slash)
   - Use your actual port number from step 1

5. **Save and wait**
   - Click **Save**
   - Wait 1-2 minutes for changes to take effect

6. **Try again**
   - Refresh your app
   - Click "Connect" again

## Example Configuration

The app is configured to use port `5174`:

**Authorized JavaScript origins:**
```
http://localhost:5174
```

**Authorized redirect URIs:**
```
http://localhost:5174
http://localhost:5174/
```

## Still Not Working?

1. **Clear browser cache** and try again
2. **Check the exact port** - Vite might use a different port if 5173 is busy
3. **Try incognito/private mode** to rule out browser cache issues
4. **Double-check the Client ID** in your `.env` file matches the one in Google Cloud Console

