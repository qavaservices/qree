# Restart Dev Server Commands

Use these commands to free port 5174 and restart the development server.

## Commands to Run (in order):

1. **Find what's using port 5174:**
   ```bash
   netstat -ano | findstr :5174
   ```

2. **Kill the process (replace PID with the actual process ID from step 1):**
   ```bash
   taskkill /PID <PID_NUMBER> /F
   ```

3. **Start the dev server:**
   ```bash
   npm run dev
   ```

## One-Liner Alternative

If you want to kill the process automatically:

```bash
for /f "tokens=5" %a in ('netstat -ano ^| findstr :5174 ^| findstr LISTENING') do taskkill /PID %a /F && npm run dev
```

## Quick Reference

**To just check what's on the port:**
```bash
netstat -ano | findstr :5174
```

**To kill by PID:**
```bash
taskkill /PID <PID_NUMBER> /F
```

**To start dev server:**
```bash
npm run dev
```

---

**Note:** Just ask me to "restart the dev server" and I'll run these commands for you!

