# Cubit Packaging - Modern Next.js Website

A modern, responsive single-page website for Cubit Packaging, featuring eco-smart custom packaging solutions.

## Features

- 🎨 **Modern Design**: Clean, minimal design with brand colors (#CDF501 lime green, #7B6AF7 purple)
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ⚡ **Fast Performance**: Built with Next.js 14 and optimized for speed
- 🎯 **Full-Screen Sections**: Each section takes full screen height for immersive experience
- 🌱 **Eco-Friendly Focus**: Sustainability messaging throughout
- 📋 **Interactive Quote Form**: Functional form with validation
- 🚀 **Smart Packaging**: QR/NFC technology showcase
- 📊 **Industry-Specific**: Tailored solutions for different industries

## Sections

1. **Header** - Sticky navigation with smooth scrolling
2. **Hero** - Eye-catching intro with call-to-action
3. **Why Choose Cubit** - 5 key benefits with statistics
4. **Product Showcase 1** - 5 main packaging solutions
5. **How It Works** - 4-step process explanation
6. **Smart Packaging** - QR/NFC technology features
7. **Industry Showcase** - 10 industry-specific solutions
8. **Sustainability** - Eco-friendly features and certifications
9. **Quote Form** - Interactive form with validation
10. **Footer** - Company info, links, and contact details

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Language**: JavaScript/React
- **Icons**: Heroicons (SVG)
- **Fonts**: Inter from Google Fonts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cubitlanding
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
cubitlanding/
├── app/
│   ├── globals.css          # Global styles and TailwindCSS
│   ├── layout.js           # Root layout
│   └── page.js             # Main page component
├── components/
│   ├── Header.js           # Navigation header
│   ├── Hero.js             # Hero section
│   ├── WhyChoose.js        # Benefits section
│   ├── ProductShowcase.js  # Main products
│   ├── HowItWorks.js       # Process steps
│   ├── SmartPackaging.js   # Smart features
│   ├── IndustryShowcase.js # Industry solutions
│   ├── Sustainability.js   # Eco-friendly info
│   ├── QuoteForm.js        # Contact form
│   └── Footer.js           # Footer section
├── tailwind.config.js      # TailwindCSS configuration
├── postcss.config.js       # PostCSS configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies
```

## Customization

### Brand Colors

The brand colors are defined in `tailwind.config.js`:
- Primary: #CDF501 (Lime Green)
- Secondary: #7B6AF7 (Purple)

### Content

All content can be easily modified by editing the respective component files in the `/components` directory.

### Styling

Custom styles are defined in:
- `app/globals.css` - Global styles and utility classes
- Individual components use TailwindCSS classes

## Deployment

The site can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any static hosting service

For Vercel deployment:
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## Form Handling

The quote form currently shows a success message on submission. To integrate with a backend:

1. Replace the form submission logic in `components/QuoteForm.js`
2. Add your email service or API endpoint
3. Update validation as needed

## Performance

- All images use Next.js Image component for optimization
- Minimal JavaScript bundle
- CSS is optimized with TailwindCSS purging
- Semantic HTML for accessibility

## License

This project is proprietary to Cubit Packaging.

## Support

For support and questions, contact: hello@cubitpackaging.com 