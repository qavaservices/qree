# Fix: Error 403: org_internal

## What This Error Means

Your OAuth consent screen is configured as **Internal** (Google Workspace only) instead of **External** (any Google account). This restricts access to only users within a specific Google Workspace organization.

## Quick Fix

### Option 1: Change to External (Recommended)

1. **Go to OAuth Consent Screen**
   - Visit: https://console.cloud.google.com/apis/credentials/consent
   - Or: Google Cloud Console → APIs & Services → OAuth consent screen

2. **Check Current Status**
   - Look at the top of the page
   - If it says **User Type: Internal**, that's the problem

3. **Change to External**
   - **If in Testing mode**: You can delete and recreate
   - **If Published**: You may need to create a new project
   - Click **Edit App** (if available)
   - Change **User Type** to **External**
   - Save changes

4. **Add Test Users** (if in Testing mode)
   - Scroll to **Test users** section
   - Click **Add Users**
   - Add your email: `pj.qavaservices@gmail.com`
   - Click **Save**

5. **Try Again**
   - Refresh your app
   - Click "Connect" again

### Option 2: Create New OAuth Consent Screen

If you can't change the existing one:

1. **Create a new Google Cloud Project**
   - Go to: https://console.cloud.google.com/
   - Create a new project
   - Enable Google Calendar API
   - Configure OAuth consent screen as **External** from the start

2. **Create New OAuth Client ID**
   - Follow the setup guide from the beginning
   - Make sure to choose **External** user type

3. **Update Your .env File**
   - Use the new Client ID

## Step-by-Step: Change to External

1. Go to: https://console.cloud.google.com/apis/credentials/consent

2. If you see **User Type: Internal**:
   - Click **Edit App** (if available)
   - Change to **External**
   - Fill in required fields:
     - App name
     - User support email
     - Developer contact email
   - Click **Save and Continue**

3. **Add Scopes**:
   - Click **Add or Remove Scopes**
   - Add: `https://www.googleapis.com/auth/calendar.readonly`
   - Click **Update** then **Save and Continue**

4. **Add Test Users**:
   - Click **Add Users**
   - Add: `pj.qavaservices@gmail.com`
   - Click **Add** then **Save and Continue**

5. **Review and Save**:
   - Review the summary
   - Click **Back to Dashboard**

6. **Wait and Test**:
   - Wait 1-2 minutes
   - Try connecting in your app again

## Why Internal vs External?

- **Internal**: Only users in your Google Workspace organization can use the app
- **External**: Any Google account can use the app (with proper authorization)

For personal projects or public apps, you need **External**.

## Still Having Issues?

If you can't change from Internal to External:
- The app might be published (can't change after publishing)
- Create a new Google Cloud project
- Start fresh with External user type from the beginning

