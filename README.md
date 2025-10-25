# CropDrive OP Advisor™

AI-powered palm oil farm analysis platform for Malaysian farmers. Transform your farming with intelligent soil and leaf analysis, actionable recommendations, and trend tracking.

## 🌟 Features

- **AI-Powered Analysis**: Upload lab reports and get instant AI insights
- **MPOB Standards**: Compare results with Malaysian Palm Oil Board standards
- **Multi-language Support**: English and Bahasa Malaysia
- **Mobile-First Design**: Optimized for farmers on-the-go
- **Subscription Tiers**: Start, Smart, and Precision plans
- **Expert Support**: WhatsApp and email support from agronomy experts
- **Secure & Private**: Bank-level security with Firebase

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm or yarn** - Package manager
- **Firebase project** - [Create here](https://console.firebase.google.com/)
- **Stripe account** - [Create here](https://stripe.com/)
- **Google Cloud Project** (for Document AI) - [Create here](https://console.cloud.google.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cropdrive-op-advisor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory with your actual values:

   ```bash
   # Copy from .env.example and fill in your values
   cp .env.example .env.local
   ```

   Then edit `.env.local` with your actual API keys (see Environment Setup section below).

4. **Set up Firebase**

   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools

   # Login to Firebase
   firebase login

   # Run automated setup
   npm run firebase:setup
   ```

5. **Set up Stripe**

   ```bash
   # Run automated Stripe setup
   npm run stripe:setup
   ```

6. **Initialize database**

   ```bash
   # Initialize Firestore with sample data
   npm run db:init
   ```

7. **Set up security rules**

   Copy the contents of `firestore.rules` and `storage.rules` to your Firebase console:
   - Go to Firestore Database → Rules
   - Go to Storage → Rules

8. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## ⚙️ Environment Setup

### 1. Copy Environment Template

```bash
cp .env.example .env.local
```

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create new)
3. Go to Project Settings → General tab
4. Scroll to "Your apps" → Add web app (</>)
5. Copy the configuration values to `.env.local`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Stripe Configuration

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Go to Developers → API keys
3. Copy keys to `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

4. Create products in Stripe:
   - **CropDrive Start** (RM24/month, RM192/year)
   - **CropDrive Smart** (RM39/month, RM336/year)
   - **CropDrive Precision** (RM49/month, RM480/year)

5. For each product, create monthly and yearly prices
6. Copy the Price API IDs to `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PRICE_START_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_START_YEARLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_SMART_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_SMART_YEARLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_PRECISION_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_PRECISION_YEARLY=price_...
```

### 4. Google Document AI Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Document AI API
3. Create an OCR processor
4. Copy values to `.env.local`:

```bash
GOOGLE_DOCUMENT_AI_PROJECT_ID=your-gcp-project
GOOGLE_DOCUMENT_AI_PROCESSOR_ID=your-processor-id
```

### 5. Security Configuration

Generate secure random strings:

```bash
# Generate NextAuth secret (32+ characters)
openssl rand -base64 32

# Update .env.local
NEXTAUTH_SECRET=your_generated_secret_here
NEXT_PUBLIC_APP_URL=https://yourdomain.com  # Update for production
```

## 🔧 Automated Setup Scripts

The project includes automated setup scripts:

```bash
# Run all setup scripts
npm run setup:all

# Individual scripts
npm run firebase:setup    # Set up Firebase services
npm run stripe:setup      # Set up Stripe products and prices
npm run db:init          # Initialize Firestore database
```

## 🗄️ Database Setup

The database initialization script creates:

- **Subscription plans** (start, smart, precision)
- **Sample testimonials** for the reviews page
- **Public settings** with app configuration
- **Required indexes** for optimal performance

### Manual Database Setup

If you prefer manual setup:

1. **Enable Firestore** in Firebase Console
2. **Copy security rules** from `firestore.rules` and `storage.rules`
3. **Create collections**:
   - `plans` - Subscription plan details
   - `users` - User accounts and preferences
   - `subscriptions` - Active subscriptions
   - `uploads` - File uploads and analysis
   - `public` - Public data (testimonials, settings)

## 💳 Stripe Integration

### Webhook Configuration

Set up webhook endpoint in Stripe Dashboard:

1. Go to Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

### Testing Webhooks

```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Test checkout
stripe trigger checkout.session.completed
```

## 🔧 Firebase Setup Guide

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enable Authentication, Firestore, and Storage

### 2. Enable Authentication
1. Go to Authentication → Sign-in method
2. Enable Email/Password provider

### 3. Configure Firestore
1. Go to Firestore Database → Create database
2. Start in test mode (change to production rules later)
3. Copy `firestore.rules` content to Rules tab

### 4. Configure Storage
1. Go to Storage → Rules
2. Copy `storage.rules` content to Rules tab

### 5. Get Configuration Keys
1. Go to Project Settings → General
2. Scroll to "Your apps" section
3. Copy the config values to `.env.local`

## 💳 Stripe Setup Guide

### 1. Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Complete account setup

### 2. Create Products
1. Go to Products → Add product
2. Create three products:
   - CropDrive Start
   - CropDrive Smart
   - CropDrive Precision

### 3. Create Prices
For each product, create two prices (monthly and yearly):
- Currency: Euro (€)
- Billing: Monthly/Yearly recurring

### 4. Set up Webhooks
1. Go to Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events: `checkout.session.completed`, `customer.subscription.*`, `invoice.*`

### 5. Get API Keys
1. Go to Developers → API keys
2. Copy Publishable key and Secret key to `.env.local`

## 🤖 Google Document AI Setup

### 1. Enable Document AI API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Document AI API

### 2. Create Processor
1. Go to Document AI → Create processor
2. Select OCR processor
3. Copy processor ID to `.env.local`

### 3. Authentication
1. Create service account key
2. Download JSON file
3. Set GOOGLE_APPLICATION_CREDENTIALS environment variable

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Login to Vercel
   vercel login

   # Deploy
   vercel
   ```

2. **Set Environment Variables**
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Add all variables from `.env.local`

3. **Configure Domains**
   - Add your custom domain in Vercel settings
   - Update `NEXT_PUBLIC_APP_URL` in environment variables

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Set up production environment**
   ```bash
   # Copy environment file
   cp .env.local .env.production

   # Update production values
   nano .env.production
   ```

3. **Start production server**
   ```bash
   npm run start
   ```

### Firebase Hosting (Alternative)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize hosting**
   ```bash
   firebase init hosting
   ```

3. **Build and deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🔧 Environment Variables Reference

### Required Variables
```bash
# Firebase (Required)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe (Required for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (Required)
NEXT_PUBLIC_STRIPE_PRICE_START_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_START_YEARLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_SMART_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_SMART_YEARLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_PRECISION_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_PRECISION_YEARLY=price_...
```

### Optional Variables
```bash
# Application
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_WHATSAPP_SUPPORT=+60123456789

# Google Document AI (for AI features)
GOOGLE_DOCUMENT_AI_PROJECT_ID=your_project
GOOGLE_DOCUMENT_AI_PROCESSOR_ID=your_processor

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Security
NEXTAUTH_SECRET=your_secret_key
```

## 🧪 Testing

### Development Testing
```bash
# Run development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint
```

### Production Testing
```bash
# Build for production
npm run build

# Test production build
npm run start
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Firebase Rules**: Review and test security rules before production
3. **Stripe Webhooks**: Verify webhook signatures in production
4. **API Keys**: Use separate keys for development and production
5. **HTTPS**: Always use HTTPS in production

## 📞 Support Integration

### WhatsApp Integration
The platform includes WhatsApp support integration. Update the WhatsApp number in:
- `NEXT_PUBLIC_WHATSAPP_SUPPORT` environment variable
- Footer component
- Support sections

### Email Notifications
Configure SMTP settings in environment variables for email notifications.

## 🌍 Internationalization

The platform supports English and Bahasa Malaysia:

- **Default Language**: Bahasa Malaysia (ms)
- **Fallback Language**: English (en)
- **Language Detection**: Automatic based on browser settings
- **Manual Switch**: Available in navbar and user settings

## 📱 Mobile Responsiveness

The platform is fully responsive and mobile-optimized:
- Touch-friendly interface
- Mobile-first design approach
- Camera integration for photo uploads
- WhatsApp integration for support

## 🤖 AI Integration

### Document AI Setup
1. Enable Document AI API in Google Cloud Console
2. Create OCR processor
3. Set up authentication with service account
4. Configure processor ID in environment variables

### AI Features
- PDF text extraction
- Nutrient analysis
- MPOB standard comparison
- Fertilizer recommendations
- Trend analysis

## 📊 Monitoring and Analytics

### Error Monitoring
- Firebase Crashlytics (recommended)
- Sentry integration (optional)

### Performance Monitoring
- Firebase Performance Monitoring
- Google Analytics integration

### User Analytics
- Firebase Analytics
- Custom event tracking for user actions

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── [locale]/          # Internationalized pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── OnboardingModal.tsx
├── lib/                   # Utilities and configurations
│   ├── auth.tsx          # Authentication context
│   ├── firebase.ts       # Firebase setup
│   ├── stripe.ts         # Stripe integration
│   └── subscriptions.ts  # Subscription management
├── i18n/                  # Internationalization
└── types/                 # TypeScript type definitions
```

## 🌐 Internationalization

The app supports English and Bahasa Malaysia:

- Default language: Bahasa Malaysia (ms)
- Fallback: English (en)
- Language switching: Available in navbar and user preferences

## 💳 Subscription Plans

### CropDrive Start (RM24/month)
- 10 uploads per month
- AI analysis reports
- 1 support session
- Standard response time

### CropDrive Smart (RM39/month) - Most Popular
- 50 uploads per month
- AI analysis reports
- 3 support sessions
- 24-hour response time
- 5% referral bonus

### CropDrive Precision (RM49/month)
- Unlimited uploads
- AI analysis reports
- Unlimited support
- 12-hour response time
- 10% referral bonus
- Comparative analysis
- Partner discounts

## 🔧 Key Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Storage**: Firebase Storage
- **Payments**: Stripe
- **AI Integration**: Streamlit (iframe)
- **Deployment**: Vercel

## 🔒 Security

- Firebase Authentication with email verification
- Firestore security rules
- Stripe payment security
- File upload validation
- Protected API routes

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-friendly interface
- Camera integration for photo uploads
- WhatsApp integration for support

## 🤖 AI Assistant

The platform integrates with AGS AI Assistant via iframe for:
- PDF text extraction using Google Document AI
- Nutrient analysis and recommendations
- MPOB standard comparisons
- Fertilizer recommendations

## 🌾 For Farmers

### Getting Started
1. Register with your farm details
2. Choose a subscription plan
3. Upload your first lab report
4. Get AI analysis and recommendations

### Best Practices
- Use clear, well-lit photos of reports
- Upload during off-peak hours for faster processing
- Keep reports organized by date
- Regular monitoring improves results

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run type-check # Run TypeScript check
```

### Code Style
- ESLint configuration included
- TypeScript strict mode enabled
- Prettier formatting recommended

## 📄 License

This project is proprietary software for CropDrive OP Advisor™.

## 🆘 Support

- **WhatsApp**: [+60123456789](https://wa.me/60123456789)
- **Email**: support@cropdrive.com
- **Help Center**: Available in tutorials section

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically on push

### Manual Deployment
1. Build the project: `npm run build`
2. Start server: `npm run start`
3. Configure reverse proxy (nginx/Apache)

## 🔄 Updates

Check the [changelog](CHANGELOG.md) for recent updates and new features.

---

**CropDrive OP Advisor™** - Smart farming for better yields 🌾✨
