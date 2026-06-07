# Mini Data App - Deployment Guide

## 📋 Pre-Deployment Checklist

Before deploying to production, ensure you have:

- [ ] MongoDB Atlas account and connection string
- [ ] Paystack account with API keys
- [ ] Flutterwave account (optional)
- [ ] VTpass account with credentials
- [ ] GitHub account with repository pushed
- [ ] Vercel account (for frontend)
- [ ] Render/Railway account (for backend)
- [ ] Environment variables configured

---

## 🚀 Step 1: Prepare Your Project

### 1.1 Update Package Versions

```bash
# Frontend - Update package.json
cd client
npm install
npm update
```

```bash
# Backend - Update package.json
cd ../server
npm install
npm update
```

### 1.2 Test Locally

```bash
# From root directory
npm run dev

# Frontend should be at: http://localhost:3000
# Backend should be at: http://localhost:5000
```

### 1.3 Create Production Build

```bash
# Build frontend
cd client
npm run build

# Verify build succeeded
ls -la build/
```

---

## 🌐 Step 2: Deploy Frontend to Vercel

### 2.1 Connect to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Choose "Framework Preset": React
6. Root Directory: `mini-data-app/client`

### 2.2 Configure Environment Variables

In Vercel Dashboard:

```
REACT_APP_API_URL=https://your-backend-url/api
REACT_APP_PAYSTACK_KEY=your_paystack_public_key
REACT_APP_FLUTTERWAVE_KEY=your_flutterwave_public_key
```

### 2.3 Deploy Settings

- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### 2.4 Click Deploy

Once deployed, you'll get a URL like:
```
https://mini-data-app.vercel.app
```

---

## 🔧 Step 3: Deploy Backend to Render

### 3.1 Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +"
4. Select "Web Service"
5. Connect your GitHub repository

### 3.2 Configure Render Service

**Basic Settings:**
- **Name**: `mini-data-app-backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`

**Build & Start Commands:**
```
Build Command: npm install --prefix server
Start Command: npm start --prefix server
```

### 3.3 Add Environment Variables

In Render Dashboard, set these variables:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mini-data-app

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRE=7d

# Payment Integration
PAYSTACK_SECRET_KEY=your_paystack_secret_key
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key

# VTU API
VTPASS_API_KEY=your_vtpass_api_key
VTPASS_API_SECRET=your_vtpass_api_secret
VTPASS_USERNAME=your_vtpass_username

# Server
PORT=5000
NODE_ENV=production

# Security
BCRYPT_ROUNDS=10
CORS_ORIGIN=https://mini-data-app.vercel.app

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@minidata.app
```

### 3.4 Deploy

Click "Create Web Service" and wait for deployment.

You'll get a URL like:
```
https://mini-data-app-backend.onrender.com
```

---

## 📦 Step 4: Set Up MongoDB Atlas

### 4.1 Create Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up/Login
3. Create a new cluster
4. Choose free tier (M0)
5. Select region closest to you
6. Wait for cluster to deploy (5-10 mins)

### 4.2 Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Username: `mini-data-app`
4. Password: Generate strong password
5. Built-in Role: `Atlas Admin`

### 4.3 Configure Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0)
4. Confirm

### 4.4 Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<username>` and `<password>`
5. Example: `mongodb+srv://mini-data-app:password@cluster.mongodb.net/mini-data-app`

---

## 💳 Step 5: Configure Paystack

### 5.1 Get Paystack Keys

1. Go to https://dashboard.paystack.com
2. Sign up/Login
3. Go to "Settings" → "API Keys & Webhooks"
4. Copy:
   - **Public Key**
   - **Secret Key**

### 5.2 Add Webhook

1. In Paystack Dashboard → Settings → Webhooks
2. **Webhook URL**: `https://your-backend-url/api/webhook/paystack`
3. Events: Select all payment events
4. Save

### 5.3 Update Environment Variables

Add to your `.env` file:
```env
REACT_APP_PAYSTACK_KEY=pk_live_your_public_key
PAYSTACK_SECRET_KEY=sk_live_your_secret_key
```

---

## 🔌 Step 6: Configure VTpass API

### 6.1 Get VTpass Credentials

1. Go to https://vtpass.com
2. Sign up/Login
3. Go to "API Documentation" or "Settings"
4. Get your:
   - **API Key**
   - **API Secret**
   - **Username**

### 6.2 Update Environment Variables

```env
VTPASS_API_KEY=your_api_key
VTPASS_API_SECRET=your_api_secret
VTPASS_USERNAME=your_username
```

---

## 🧪 Step 7: Post-Deployment Testing

### 7.1 Test Frontend

```bash
# Visit your Vercel URL
https://mini-data-app.vercel.app

# Test:
1. Register a new account
2. Login
3. Check dashboard loads
4. Verify API calls work
```

### 7.2 Test Backend

```bash
# Test health check
curl https://your-backend-url/api/health

# Should return:
# {"status":"Server is running","timestamp":"2026-06-07T..."}
```

### 7.3 Test API Endpoints

```bash
# Register
curl -X POST https://your-backend-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+234800000000",
    "password": "password123"
  }'

# Login
curl -X POST https://your-backend-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 🔒 Step 8: Security Hardening

### 8.1 Enable HTTPS

- Vercel: Automatic ✅
- Render: Automatic ✅

### 8.2 Configure CORS

Update `server.js`:
```javascript
app.use(cors({
  origin: 'https://mini-data-app.vercel.app',
  credentials: true
}));
```

### 8.3 Set Secure Cookies

Update environment variables:
```env
NODE_ENV=production
SECURE_COOKIES=true
SAME_SITE=Strict
```

### 8.4 Enable Rate Limiting

Already configured in `server.js` ✅

### 8.5 MongoDB Security

- Use strong passwords ✅
- IP whitelist configured ✅
- Database user created ✅

---

## 📊 Step 9: Monitoring & Logging

### 9.1 Setup Error Tracking (Optional)

Install Sentry for error tracking:

**Frontend:**
```bash
npm install @sentry/react @sentry/tracing
```

**Backend:**
```bash
npm install @sentry/node @sentry/tracing
```

### 9.2 Monitor Performance

- Vercel Dashboard: https://vercel.com/dashboard
- Render Dashboard: https://dashboard.render.com
- MongoDB Atlas: https://cloud.mongodb.com

### 9.3 Check Logs

**Vercel:**
- Go to Project → Deployments → View Logs

**Render:**
- Go to Service → Logs → View all logs

---

## 🚨 Troubleshooting

### Issue: Frontend can't connect to backend

**Solution:**
1. Check REACT_APP_API_URL is correct
2. Verify CORS is configured
3. Check backend is running
4. Run: `npm run build && npm start --prefix client`

### Issue: MongoDB connection failed

**Solution:**
1. Verify connection string is correct
2. Check IP is whitelisted
3. Verify username/password
4. Try connecting from MongoDB Compass

### Issue: Paystack payment not working

**Solution:**
1. Verify Paystack keys are correct
2. Check test mode is enabled
3. Review Paystack documentation
4. Check webhook logs

### Issue: VTpass API errors

**Solution:**
1. Verify credentials are correct
2. Check VTpass documentation
3. Test with cURL command
4. Check network logs

---

## 📈 Step 10: Going Live

### Pre-Launch Checklist

- [ ] All tests passing
- [ ] No console errors
- [ ] Paystack working in test mode
- [ ] VTpass credentials verified
- [ ] MongoDB connected successfully
- [ ] Environment variables set
- [ ] CORS configured
- [ ] SSL/TLS enabled
- [ ] Backups configured
- [ ] Monitoring active

### Launch Steps

1. **Test with real transactions**
   - Use Paystack test cards
   - Verify transactions recorded in MongoDB

2. **Enable production mode**
   - Switch Paystack to live keys
   - Update CORS origin to production URL
   - Set NODE_ENV=production

3. **Monitor closely**
   - Check logs frequently
   - Monitor error rates
   - Verify payment processing

4. **Announce & Market**
   - Share your app with users
   - Start referral program
   - Monitor user growth

---

## 🔄 Continuous Deployment

### Auto-Deploy on Push

**Vercel:**
- Automatically deploys on git push to main ✅

**Render:**
- Automatically deploys on git push to main ✅

### Manual Redeploy

**Vercel:**
```bash
vercel --prod
```

**Render:**
- Click "Manual Deploy" in dashboard

---

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Paystack Docs**: https://paystack.com/docs
- **Express Docs**: https://expressjs.com
- **React Docs**: https://react.dev

---

## 🎉 You're Live!

Congratulations! Your Mini Data App is now live in production.

**Your URLs:**
- Frontend: https://mini-data-app.vercel.app
- Backend: https://mini-data-app-backend.onrender.com
- Database: MongoDB Atlas (secure)

Start acquiring users and earning revenue! 🚀💰
