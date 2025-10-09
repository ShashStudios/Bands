# Technical Overview - Bands Project

## Project Summary

**Bands** is a Next.js 15 application building an AI-native marketplace platform. The project uses modern web technologies with authentication, data visualization, and now includes a sophisticated waitlist feature.

---

## Tech Stack

### Frontend Framework
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

### UI & Styling
- **TailwindCSS 4** - Utility-first CSS framework
- **shadcn/ui** - Component library (Radix UI primitives)
- **Framer Motion** - Animation library for smooth interactions
- **Lucide React** - Modern icon library

### Authentication
- **Clerk** (@clerk/nextjs ^6.33.0) - Complete auth solution
  - Sign-in/Sign-up pages
  - Protected routes via middleware
  - User management

### Data Visualization & Export
- **Recharts 2.15.4** - Charting library for analytics
- **html2canvas 1.4.1** - Screenshot/image generation
- **jsPDF 3.0.3** - PDF export functionality

### Email Service
- **Resend** - Transactional email API for waitlist notifications

---

## Project Structure

```
Bands/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── waitlist/      # Waitlist submission endpoint
│   │   ├── dashboard/         # Protected dashboard
│   │   ├── forma/             # Hotel pro forma tool
│   │   ├── sign-in/           # Clerk sign-in
│   │   ├── sign-up/           # Clerk sign-up
│   │   ├── waitlist/          # NEW: Waitlist form page
│   │   ├── learn-more/        # Information pages
│   │   ├── layout.tsx         # Root layout with Clerk provider
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Global styles
│   │
│   ├── components/            # Reusable components
│   │   └── ui/               # UI components
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       ├── slider.tsx
│   │       ├── table.tsx
│   │       ├── chart.tsx
│   │       ├── label.tsx
│   │       ├── textarea.tsx           # NEW
│   │       ├── floating-label-input.tsx # NEW
│   │       └── background-beams.tsx   # NEW
│   │
│   ├── lib/                   # Utility functions
│   │   ├── utils.ts          # Helper functions
│   │   └── pdf-generator.ts  # PDF export logic
│   │
│   └── middleware.ts          # Route protection (Clerk)
│
├── public/                    # Static assets
│   ├── b.png                 # Logo
│   ├── bands.png
│   └── [other assets]
│
├── package.json              # Dependencies
├── tsconfig.json            # TypeScript config
├── next.config.ts           # Next.js config
├── tailwind.config.js       # Tailwind config
├── README.md               # Hotel pro forma docs (legacy)
├── WAITLIST_SETUP.md       # Waitlist setup guide
└── TECHNICAL_OVERVIEW.md   # This file
```

---

## Core Features

### 1. Authentication (Clerk)
- Sign-in/Sign-up flows
- Protected routes: `/forma`, `/dashboard`
- Middleware-based route protection
- User profile management

### 2. Hotel Pro Forma Builder (`/forma`)
- 5-year financial forecasting tool
- Interactive sliders for inputs
- Real-time calculations
- Data visualization with Recharts
- CSV/PDF export capabilities

### 3. Landing Page (`/`)
- Modern grid background design
- Floating navigation bar
- CTA buttons for multiple actions
- Links to external resources

### 4. Waitlist Feature (`/waitlist`) ✨ NEW
- **Aceternity UI-inspired design**
- Animated background effects
- Floating label inputs with smooth animations
- Form validation (client + server)
- Email notifications via Resend
- Success state with animations
- Mobile-responsive design

### 5. Dashboard (`/dashboard`)
- User-specific data view
- Protected route requiring authentication

---

## Key Integrations

### Clerk Authentication
```typescript
// middleware.ts
const isProtectedRoute = createRouteMatcher([
  '/forma(.*)',
  '/dashboard(.*)'
]);
```

Protected routes automatically redirect to sign-in if user not authenticated.

### Resend Email Service
```typescript
// API route: /api/waitlist
await resend.emails.send({
  from: "Bands Waitlist <onboarding@resend.dev>",
  to: ["eliotshytaj05@gmail.com"],
  subject: `New Waitlist Signup: ${name}`,
  html: emailContent,
  replyTo: email,
});
```

---

## Environment Variables Required

Add these to your `.env` or `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Resend Email API (for waitlist)
RESEND_API_KEY=re_...
```

---

## Design System

### Color Palette
- **Primary Green**: `#7ed957`
- **Hover Green**: `#6bc84a`
- **Background**: White with subtle grid pattern
- **Text**: Gray-900 for primary, Gray-600 for secondary

### Typography
- **Fonts**: Geist Sans (primary), Geist Mono (code)
- **Headings**: Bold, large (5xl-7xl)
- **Body**: Regular, sm-base

### Components
- Uses shadcn/ui component primitives
- Custom Aceternity-inspired animations
- Consistent border-radius: 0.625rem base
- Hover states with smooth transitions

---

## Data Flow

### Waitlist Submission Flow
1. User fills form on `/waitlist`
2. Client-side validation
3. POST request to `/api/waitlist`
4. Server-side validation
5. Resend API sends email
6. Success response to client
7. Success animation displays

### Authentication Flow
1. User accesses protected route
2. Middleware checks auth status
3. Redirects to `/sign-in` if not authenticated
4. Clerk handles auth
5. Redirects back to original route

---

## API Endpoints

### `/api/waitlist`
- **POST**: Submit waitlist form
  - Body: `{ name, email, company?, role?, message? }`
  - Returns: `{ message, data }`
  - Sends email notification
- **GET**: Health check
  - Returns: `{ message: "Waitlist API is running" }`

---

## Development Setup

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
# or with Turbopack
npm run dev --turbopack
```

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

---

## Recent Additions (Latest Session)

1. ✅ **Waitlist Feature**
   - Modern form with Aceternity UI design
   - Animated floating label inputs
   - Email integration via Resend
   - Success/error states

2. ✅ **New Components**
   - `FloatingLabelInput` - Animated input fields
   - `BackgroundBeams` - SVG animated background
   - `Textarea` - Form textarea component

3. ✅ **API Routes**
   - `/api/waitlist` - Handle form submissions

4. ✅ **Updated Landing Page**
   - Added "Join Waitlist" CTA button
   - Improved button hierarchy

---

## Known Considerations

### README Mismatch
The `README.md` describes a "hotel pro forma builder" which seems to be one feature (`/forma` route) of a larger marketplace platform. The project appears to have evolved beyond just the pro forma tool.

### Email Configuration
- Currently using Resend's default domain (`onboarding@resend.dev`)
- For production, should verify custom domain
- Recipient hardcoded to `eliotshytaj05@gmail.com`

### Database
- No database currently configured for storing waitlist submissions
- Submissions only sent via email
- Consider adding Prisma/MongoDB for persistence

---

## Suggested Next Steps

### High Priority
1. Set up Resend API key in environment variables
2. Test waitlist form end-to-end
3. Add database for waitlist persistence
4. Update README.md to reflect current project scope

### Medium Priority
5. Add thank-you email to waitlist subscribers
6. Create admin dashboard for viewing submissions
7. Add analytics tracking (Google Analytics, Plausible)
8. Implement rate limiting on API routes

### Low Priority
9. Add more pages: Pricing, Mission, Blog
10. Enhance `/forma` tool with more features
11. Add dark mode support
12. Add internationalization (i18n)

---

## Performance Considerations

- **Next.js 15** with Turbopack for faster builds
- **React 19** with concurrent features
- **Server Components** by default (App Router)
- **Dynamic imports** for code splitting
- Image optimization via Next.js `<Image>`

---

## Security

- Clerk handles authentication security
- API routes validate input
- Environment variables for secrets
- HTTPS required for production
- CORS handled by Next.js

---

## Deployment

The app is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **DigitalOcean**

Make sure to:
1. Set environment variables in hosting platform
2. Configure custom domain in Resend
3. Update `from` email address in API route
4. Test authentication in production environment

---

## Monitoring & Analytics

Consider adding:
- **Sentry** - Error tracking
- **PostHog** - Product analytics
- **Vercel Analytics** - Performance monitoring
- **LogRocket** - Session replay

---

**Last Updated**: 2025-10-08  
**Framework**: Next.js 15.5.4  
**Status**: Active Development  
**Primary Goal**: AI-Native Marketplace Platform
