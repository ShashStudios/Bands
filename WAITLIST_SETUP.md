# Waitlist Feature Setup Guide

## Overview
A modern, Aceternity UI-inspired waitlist form has been added to your application. Users can join the waitlist, and submissions will be sent to your email: **eliotshytaj05@gmail.com**

## What Was Added

### 1. **New Pages**
- `/waitlist` - Beautiful, animated waitlist form with modern UI

### 2. **Components**
- `FloatingLabelInput` - Animated input fields with floating labels
- `BackgroundBeams` - Aceternity-style animated background (optional)
- `Textarea` - Form textarea component

### 3. **API Route**
- `/api/waitlist` - Handles form submissions and sends email notifications

### 4. **Updated Landing Page**
- Added "Join Waitlist" button to the homepage

## Required Setup

### Step 1: Get a Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free tier)
3. Navigate to API Keys in your dashboard
4. Create a new API key
5. Copy the API key

### Step 2: Add Environment Variable

Add the following to your `.env` or `.env.local` file:

```env
RESEND_API_KEY=re_your_api_key_here
```

### Step 3: Verify Email Domain (Optional but Recommended)

For production use:
1. In Resend dashboard, go to Domains
2. Add and verify your domain
3. Update the `from` field in `/src/app/api/waitlist/route.ts`:

```typescript
from: "Bands Waitlist <waitlist@yourdomain.com>",
```

## Features

✅ **Modern UI** - Aceternity UI-inspired design with animations  
✅ **Form Validation** - Client-side and server-side validation  
✅ **Email Notifications** - Instant email to your inbox on each submission  
✅ **Success States** - Beautiful success animation after submission  
✅ **Mobile Responsive** - Works perfectly on all devices  
✅ **Loading States** - Visual feedback during submission  
✅ **Error Handling** - Graceful error messages  

## Form Fields

- **Name** (required)
- **Email** (required)
- **Company** (optional)
- **Role** (optional)
- **Message** (optional)

## Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/waitlist`

3. Fill out and submit the form

4. Check your email (eliotshytaj05@gmail.com) for the notification

## Email Format

You'll receive emails with this information:
- Submitter's name
- Submitter's email
- Company (if provided)
- Role (if provided)
- Message (if provided)
- Submission timestamp

The email will have the submitter's email as the reply-to address for easy responses.

## Customization

### Change Colors
Edit the green accent colors in `/src/app/waitlist/page.tsx`:
- `#7ed957` - Primary green
- `#6bc84a` - Hover green

### Change Recipient Email
Edit `/src/app/api/waitlist/route.ts`:
```typescript
to: ["your-new-email@example.com"],
```

### Add Database Storage
Uncomment and implement the database logic in `/src/app/api/waitlist/route.ts`:
```typescript
// await db.waitlist.create({ name, email, company, role, message });
```

## Troubleshooting

### Emails not sending?
1. Check that `RESEND_API_KEY` is set in your `.env` file
2. Verify the API key is valid in Resend dashboard
3. Check the server console for error messages
4. For production, verify your domain in Resend

### Form not submitting?
1. Open browser console for error messages
2. Check Network tab for API response
3. Ensure all required fields are filled

### Styling issues?
1. Make sure Tailwind CSS is properly configured
2. Verify `framer-motion` is installed
3. Clear Next.js cache: `rm -rf .next`

## Next Steps

Consider adding:
- Database integration (Prisma, MongoDB, etc.)
- Thank you email to submitters
- Admin dashboard to view submissions
- Export submissions to CSV
- Integration with CRM (HubSpot, Salesforce, etc.)
- Analytics tracking

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure all dependencies are installed: `npm install`
4. Restart the development server

---

**Created by Cascade AI Assistant**  
*Waitlist feature with Aceternity UI design*
