# Google Calendar Integration Setup

This guide will help you set up Google Calendar integration to fetch your meetings.

## Prerequisites

1. A Google Cloud Project
2. Google Calendar API enabled
3. OAuth 2.0 credentials

## Step-by-Step Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID

### 2. Enable Google Calendar API

1. In the Google Cloud Console, navigate to **APIs & Services** > **Library**
2. Search for "Google Calendar API"
3. Click on it and press **Enable**

### 3. Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. **IMPORTANT - Configure the OAuth consent screen:**
   - Go to **APIs & Services** > **OAuth consent screen**
   - **User Type**: Choose **External** (NOT Internal - Internal is only for Google Workspace organizations)
   - Click **Create**
   - Fill in the required information:
     - **App name**: "Customer Success Manager" (or any name)
     - **User support email**: Your email address
     - **Developer contact information**: Your email address
   - Click **Save and Continue**
   - **Scopes**: Click **Add or Remove Scopes**
     - Search for and add: `https://www.googleapis.com/auth/calendar.readonly`
     - Click **Update** then **Save and Continue**
   - **Test users** (if in Testing mode):
     - Click **Add Users**
     - Add your email address (`pj.qavaservices@gmail.com`)
     - Click **Add** then **Save and Continue**
   - **Summary**: Review and click **Back to Dashboard**

4. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: "Customer Success Manager" (or any name you prefer)
   - **Authorized JavaScript origins**: 
     - For development: `http://localhost:5174` (configured in vite.config.js)
     - For production: Your production domain (e.g., `https://yourdomain.com`)
   - **Authorized redirect URIs**: 
     - **IMPORTANT**: For Google Identity Services (GIS) token client, you need to add:
     - `http://localhost:5174` (for development)
     - `http://localhost:5174/` (with trailing slash - also for development)
     - Your production domain URLs (with and without trailing slash)
     - **Note**: The app is configured to always use port 5174
   - Click **Create**

5. Copy your **Client ID** (it will look like: `xxxxx.apps.googleusercontent.com`)

### 4. Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add your Google Client ID:

```env
VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
```

3. Restart your development server for the changes to take effect

### 5. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the **Meetings** page in the app
3. Click **Connect** to authorize Google Calendar access
4. Sign in with your Google account and grant permissions
5. Your meetings should now appear!

## Troubleshooting

### "Error 403: org_internal" error
**This means your OAuth consent screen is set to "Internal" instead of "External".**

**Solution:**
1. Go to [Google Cloud Console OAuth Consent Screen](https://console.cloud.google.com/apis/credentials/consent)
2. Check the **User Type** at the top
3. If it says **Internal**, you need to change it:
   - **Note**: You cannot change from Internal to External directly if the app is published
   - If the app is in Testing mode, you can delete and recreate it as External
   - Or create a new OAuth client ID in a different project
4. **Better solution**: Create a new OAuth consent screen:
   - Go to **APIs & Services** > **OAuth consent screen**
   - Make sure **User Type** is set to **External**
   - If it's Internal, you'll need to either:
     - Delete the current consent screen (if in Testing mode) and create a new one as External
     - Or use a different Google Cloud project
5. Make sure your email is added to **Test users** (if in Testing mode)
6. Save and try connecting again

**Why this happens:**
- Internal apps can only be used by users within your Google Workspace organization
- External apps can be used by any Google account
- For personal use or public apps, you need External

### "Error 400: redirect_uri_mismatch" error
This is the most common error! It means your redirect URI doesn't match what's configured in Google Cloud Console.

**Solution:**
1. Go to [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials)
2. Click on your OAuth 2.0 Client ID
3. Check the **Authorized JavaScript origins** section:
   - Make sure `http://localhost:5173` is listed (or whatever port your dev server uses)
   - Check your terminal to see what port Vite is actually using
4. Check the **Authorized redirect URIs** section:
   - Add `http://localhost:5173` (without trailing slash)
   - Add `http://localhost:5173/` (with trailing slash)
   - Make sure the port number matches exactly (e.g., if Vite uses 5174, use 5174)
5. **Save** the changes
6. Wait 1-2 minutes for changes to propagate
7. Try connecting again

**Common issues:**
- Port mismatch: Check your terminal to see what port Vite is using
- Missing trailing slash: Try adding both with and without `/`
- HTTP vs HTTPS: Make sure you're using `http://` for localhost (not `https://`)

### "Google Client ID not configured" error
- Make sure you've created a `.env` file with `VITE_GOOGLE_CLIENT_ID`
- Restart your dev server after adding the environment variable
- Check that the variable name is exactly `VITE_GOOGLE_CLIENT_ID` (Vite requires the `VITE_` prefix)

### "Failed to load Google APIs" error
- Check your internet connection
- Make sure Google Calendar API is enabled in your Google Cloud project
- Verify your Client ID is correct

### "User not signed in" error
- Click the **Connect** button to sign in
- Make sure you've granted calendar read permissions
- Try disconnecting and reconnecting

### Meetings not showing
- Check that you have meetings in your Google Calendar
- Try changing the date range filter (Today, Week, Month, Upcoming)
- Check the browser console for any errors

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file should already be in `.gitignore`
- For production, set environment variables through your hosting platform
- The app only requests read-only access to your calendar

## Permissions

The app requests the following Google Calendar permissions:
- **Read-only access** to your calendar events
- No write or delete permissions
- Only accesses your primary calendar

