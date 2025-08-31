# 🇩🇪 Germany Immigration Consultation Booking Platform

A comprehensive web application for professional immigration consultation services with integrated payment processing and AI-powered document generation.

## 🚀 Live Website
**Production**: https://consultant-booking-payments-triu.vercel.app

## ✨ Key Features

### 💳 Payment Processing
- **Stripe Integration**: Secure payment processing with live webhook support
- **Multiple Services**: Different consultation types with individual pricing
- **Secure Checkout**: Backend API handles all sensitive operations

### 🤖 AI-Powered Document Generation
- **Google Gemini AI**: Generates professional cover letters and motivation letters
- **Job-Tailored**: Customizes documents based on specific job descriptions
- **Multiple Formats**: Download as PDF or Markdown

### 📋 Services Offered
1. **Degree Recognition (ZAB)** - €50
2. **Integration Course Application** - €30  
3. **CV & Application Letter Service** - €50
4. **Visa & Residence Permit** - €40

### 🛡️ Security & Reliability
- API-based architecture with Vercel Functions
- Environment variable management
- Webhook signature verification
- No sensitive data in frontend

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for responsive design
- **Google Fonts** (Poppins) for typography

### Backend
- **Vercel Functions** (Node.js serverless)
- **Stripe API** for payment processing
- **Google Gemini AI** for document generation

### Development
- **GitHub** for version control
- **Vercel** for automatic deployment
- **Environment variables** for secure configuration

## 🔧 Installation & Development

### Prerequisites
- Node.js 18+


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
