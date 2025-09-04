# Cubit Packaging Website

A modern Next.js website for Cubit Packaging, featuring custom packaging solutions, product showcases, and quote management.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd cubitlanding
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.local.example .env.local
```

Update `.env.local` with your actual values:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_EMAILJS_*`: EmailJS configuration for contact forms
- `GMAIL_*`: Gmail SMTP configuration for email notifications
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API for address autocomplete

4. Run the development server
```bash
npm run dev
```

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                 # Next.js 13+ app directory
│   ├── admin/          # Admin dashboard pages
│   ├── api/            # API routes
│   └── globals.css     # Global styles
├── components/         # React components
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries
├── utils/             # Helper functions
└── public/            # Static assets
```

## 🔧 Features

- **Product Showcase**: Dynamic product displays with filtering
- **Quote System**: Integrated quote request and management
- **Admin Dashboard**: Complete admin interface for content management
- **Email Integration**: Automated email notifications
- **Chat Widget**: Real-time customer support
- **Responsive Design**: Mobile-first responsive layout
- **SEO Optimized**: Meta tags and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Email**: EmailJS + Gmail SMTP
- **Deployment**: Vercel

## 📝 Environment Variables

Required environment variables for production:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_RUSH_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=

# Gmail SMTP
GMAIL_USER=
GMAIL_APP_PASSWORD=

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Site URL
NEXT_PUBLIC_SITE_URL=
```

## 🚀 Production Checklist

- ✅ Environment variables configured
- ✅ Supabase database setup
- ✅ Email services configured
- ✅ Build process tested
- ✅ Security headers configured
- ✅ Performance optimized

## 📞 Support

For technical support or questions, contact the development team.