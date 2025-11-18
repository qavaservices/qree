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
3. If prompted, configure the OAuth consent screen:
   - Choose **External** (unless you have a Google Workspace)
   - Fill in the required information (App name, User support email, etc.)
   - Add your email to test users
   - Save and continue through the scopes (you can skip adding scopes for now)
   - Save and continue through the test users
   - Go back to dashboard

4. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: "Customer Success Manager" (or any name you prefer)
   - **Authorized JavaScript origins**: 
     - For development: `http://localhost:5173` (or your dev port)
     - For production: Your production domain (e.g., `https://yourdomain.com`)
   - **Authorized redirect URIs**: 
     - For development: `http://localhost:5173` (or your dev port)
     - For production: Your production domain
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

