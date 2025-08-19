# Pet Name Generator - AI-Powered Pet Naming Application

A modern web application that uses AI to generate personalized pet names based on uploaded photos. Built with Next.js 15, TypeScript, and Tailwind CSS for the frontend, and Node.js with Express for the backend.

## Features

- 📸 **AI Photo Analysis**: Upload pet photos for intelligent analysis
- 🤖 **Smart Name Generation**: AI-powered personalized name suggestions
- 🔒 **Security**: reCAPTCHA v3 integration for spam protection
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🚀 **Server Actions**: Next.js server actions for seamless data flow
- 🌍 **Environment Security**: Secure environment variable management

## Tech Stack

### Frontend

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hook Form** for form management
- **Google reCAPTCHA v3** for security
- **Lucide React** for icons

### Backend

- **Node.js** with Express
- **TypeScript** for type safety
- **Hugging Face Inference API** for AI capabilities
- **Multer** for file upload handling
- **CORS** for cross-origin requests

## Getting Started

### 1. Backend Setup

Navigate to the backend directory:

```bash
cd name-your-pet-backend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
PORT=3001
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
FRONTEND_URL=http://localhost:3000
```

Build and start the backend:

```bash
npm run build
npm run dev
```

### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd name-your-pet
```

Install dependencies (already done):

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your keys:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
BACKEND_URL=http://localhost:3001
```

Start the development server:

```bash
npm run dev
```

## API Keys Setup

### Hugging Face API Key

1. Go to [Hugging Face](https://huggingface.co/)
2. Create account and get API token
3. Add to backend `.env` file

### Google reCAPTCHA v3

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin/)
2. Create new site with reCAPTCHA v3
3. Add keys to frontend `.env.local`
