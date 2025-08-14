# Price Compare App (Live APIs)

A minimal full‑stack app that searches multiple marketplaces and shows live prices.

## Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **APIs:** Amazon Product Advertising API (PA‑API 5.0), Flipkart Affiliate API

---

## Quick Start

### 1) Clone & set up
```bash
git clone https://github.com/adnaangain/price-compare-app.git
cd price-compare-app
```

### 2) Backend (set API keys)
```bash
cd backend
cp .env.example .env
# Edit .env and add your keys
npm install
npm run dev
```
Backend runs on `http://localhost:5001` by default.

### 3) Frontend
Open a new terminal:
```bash
cd frontend
cp .env.example .env
# If your backend is different, edit VITE_API_BASE in .env
npm install
npm run dev
```
Visit the URL shown by Vite (usually `http://localhost:5173`).

---

## Deploy (Optional)

- **Backend** → Render/Heroku/Fly.io. Set the same **environment variables** from `.env` in the host dashboard.
- **Frontend** → Vercel/Netlify. Set `VITE_API_BASE` to your deployed backend URL.

---

## Environment Variables

### Backend `.env`
```
PORT=5001

# Amazon PA-API 5.0
AMAZON_ACCESS_KEY=
AMAZON_SECRET_KEY=
AMAZON_PARTNER_TAG=yourtag-21
AMAZON_MARKETPLACE=www.amazon.in
AMAZON_REGION=us-east-1

# Flipkart Affiliate API
FLIPKART_AFFILIATE_ID=
FLIPKART_AFFILIATE_TOKEN=
```

### Frontend `.env`
```
VITE_API_BASE=http://localhost:5001
```

---

## Notes & Limits
- **Amazon PA-API** requires an approved associate account. Requests without valid keys will fail.
- **Flipkart Affiliate API** needs your Affiliate ID and Token in headers.
- For categories without official APIs, you can add more services using public APIs or scraping (respect robots.txt and TOS).

---

## Project Structure
```
price-compare-app/
 ├── frontend/        # React UI
 └── backend/         # Express API
```
