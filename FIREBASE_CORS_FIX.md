# Fix Firebase Storage CORS Error

## ⚠️ Important Note

**Firebase Storage does NOT have a CORS UI in the console anymore.**  
You **must** use `gsutil` (Google Cloud CLI) to configure CORS.  
This is the **only way** to fix CORS for Firebase Storage.

## Why You're Getting the CORS Error

Your app runs on: `http://localhost:5173`  
Firebase Storage lives on: `https://firebasestorage.googleapis.com`

Browsers block cross-origin uploads unless CORS is explicitly set at the bucket level.

---

## ✅ THE REAL FIX (Step-by-Step)

### STEP 1: Install Google Cloud SDK (one-time)

1. Download and install: https://cloud.google.com/sdk/docs/install
2. **Restart your terminal** after installation
3. Verify installation:
   ```bash
   gcloud --version
   ```

### STEP 2: Login to Google Cloud

```bash
gcloud auth login
```

Log in using the **same Google account** that owns your Firebase project.

### STEP 3: Set the Correct Project

```bash
gcloud config set project dashboard-tbi
```

(Your project ID is `dashboard-tbi`)

### STEP 4: Create cors.json

Create a file named `cors.json` (you can put it on your Desktop or in the project root):

```json
[
  {
    "origin": [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173"
    ],
    "method": ["GET", "POST", "PUT", "DELETE", "HEAD"],
    "maxAgeSeconds": 3600
  }
]
```

### STEP 5: Apply CORS to Firebase Storage Bucket

⚠️ **This is the critical command**

```bash
gsutil cors set cors.json gs://dashboard-tbi.firebasestorage.app
```

If this command runs without error, CORS is fixed! ✅

### STEP 6: Hard Refresh Browser

1. **Close browser completely**
2. **Reopen browser**
3. **Reload dashboard**
4. **Try Add Member again**

---

## ✅ ALSO CHECK: Storage Rules (Must be Open for Now)

Go to: **Firebase Console → Storage → Rules**

Update to:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

Click **Publish**.

> ⚠️ **Note:** These rules allow anyone to read/write. For production, you should add authentication checks.

---

## 🔍 How to Confirm It Worked

After uploading an image:

1. **Firebase Console → Storage → Files**
   - You should see: `team/1719xxxxx_profile.jpg`

2. **Firebase Console → Firestore**
   - New document with `imageUrl` pointing to storage URL

3. **Your Dashboard UI**
   - New member appears in the registry

---

## ❗ Important Reassurance

- ✅ This is **NOT** a mistake in your React code
- ✅ This is **NOT** a Firebase config bug
- ✅ This is just Firebase Storage's tooling requirement
- ✅ **Every developer hits this once**

---

## 🆘 If gsutil Command Fails

If you get an error, paste the **exact error message** and we'll fix it immediately.

Common issues:
- `gsutil: command not found` → Google Cloud SDK not installed or not in PATH
- `Access Denied` → Make sure you're logged in with the correct account
- `Bucket not found` → Check your project ID matches `dashboard-tbi`

---

## 🎯 Once This is Done

✅ Add Member will work  
✅ Image uploads will work  
✅ URLs will be stored in Firestore  
✅ You're at the final blocker - this fixes it!

---

## 📝 Quick Reference

```bash
# 1. Install Google Cloud SDK (one-time)
# Download from: https://cloud.google.com/sdk/docs/install

# 2. Login
gcloud auth login

# 3. Set project
gcloud config set project dashboard-tbi

# 4. Create cors.json (see content above)

# 5. Apply CORS
gsutil cors set cors.json gs://dashboard-tbi.firebasestorage.app

# 6. Hard refresh browser and test!
```
