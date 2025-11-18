# How to Push to GitHub - Step by Step

## Method 1: Using Personal Access Token (Easiest)

### Step 1: Create a Personal Access Token on GitHub

1. **Go to GitHub.com** and sign in
2. Click your **profile picture** (top right) → **Settings**
3. Scroll down in the left sidebar → **Developer settings**
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Fill in:
   - **Note**: "Customer Success Manager" (or any name)
   - **Expiration**: Choose your preference (90 days, 1 year, etc.)
   - **Select scopes**: Check the box for **`repo`** (this gives full repository access)
7. Click **Generate token** at the bottom
8. **IMPORTANT**: Copy the token immediately! It looks like: `ghp_xxxxxxxxxxxxxxxxxxxx`
   - You won't be able to see it again!

### Step 2: Push Your Code

Open PowerShell or Command Prompt in your project folder, then run:

```bash
git push -u origin main
```

When prompted:
- **Username**: Enter your GitHub username
- **Password**: Paste your Personal Access Token (NOT your GitHub password!)

That's it! Your code will be pushed to GitHub.

---

## Method 2: Using GitHub Desktop (Visual, No Commands)

1. **Download GitHub Desktop**: https://desktop.github.com/
2. **Install and open** GitHub Desktop
3. **Sign in** with your GitHub account
4. Click **File** → **Add Local Repository**
5. Click **Choose...** and navigate to:
   ```
   C:\Users\PC\Documents\GitHub\customer-success-manager
   ```
6. Click **Add Repository**
7. You'll see your commit. Click **Publish repository** button (top right)
8. Make sure the repository name is `qree` and owner is `qavaservices`
9. Click **Publish Repository**

Done! Your code is now on GitHub.

---

## Method 3: Using Git Credential Manager (Windows)

If you're on Windows, Git Credential Manager might pop up automatically:

1. When you run `git push -u origin main`
2. A browser window will open
3. Sign in to GitHub
4. Authorize the app
5. The push will complete automatically

---

## Verify It Worked

After pushing, visit:
**https://github.com/qavaservices/qree**

You should see all your files there!

---

## If You Get Errors

### "Repository not found"
- Make sure the repository exists at https://github.com/qavaservices/qree
- Check you have write access

### "Authentication failed"
- Make sure you're using a Personal Access Token, not your password
- Check the token has `repo` scope

### "500/502 Error"
- Wait a few minutes (GitHub might be having issues)
- Try again later

