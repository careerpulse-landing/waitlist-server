# Waitlist Server (Railway)

A lightweight Express server to collect waitlist emails, store them in Supabase, and send a confirmation email via Resend.

## 🔧 Setup

1. Clone this repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file using `.env.example` as reference
4. Start the server:
   ```bash
   npm start
   ```

## 🚀 Deploy

Deploy to [Railway](https://railway.app) and set these environment variables:

- `SUPABASE_URL`
- `SERVICE_ROLE_KEY`
- `RESEND_API_KEY`

## 📫 POST /waitlist

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "You're on the waitlist, user@example.com!"
}
```