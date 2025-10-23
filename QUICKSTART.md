# Quick Start Guide

Get up and running with Impact Story Builder in 5 minutes!

## ⚡ Quick Setup

### 1. Install Dependencies (if not already done)

```bash
npm install
```

### 2. Run Without Supabase (Development Mode)

You can explore the UI without setting up Supabase:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the landing page!

### 3. Set Up Supabase (For Full Functionality)

**Create a Supabase project:**
- Go to [supabase.com](https://supabase.com) and create a new project
- Wait 2 minutes for it to initialize

**Get credentials:**
- Go to Project Settings → API
- Copy the Project URL and anon/public key

**Create `.env.local`:**

```bash
cp .env.example .env.local
```

Add your credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

**Set up database:**
- Open Supabase SQL Editor
- Copy/paste contents from `supabase/schema.sql`
- Click Run

**Restart the dev server:**

```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

## 🎯 What's Included

### ✅ Complete Landing Page
- Hero section with value proposition
- Features showcase
- Problem/solution sections
- Call-to-action sections
- Fully responsive design

### ✅ Navigation & Layout
- Header with navigation links
- Footer with links
- Responsive mobile menu ready
- User profile dropdown (when authenticated)

### ✅ Authentication Pages
- `/auth/login` - Login form
- `/auth/signup` - Registration form with organization setup
- Forms are styled and ready (logic needs implementation)

### ✅ Dashboard & Core Pages
- `/dashboard` - Overview with stats cards
- `/beneficiaries` - Beneficiary management (empty state)
- `/stories` - Story collection (empty state)
- `/reports` - Report generation (empty state)
- `/settings` - User settings (placeholder)
- `/organization` - Organization management (placeholder)

### ✅ Database Schema
- Complete PostgreSQL schema with RLS policies
- Organizations, Users, Beneficiaries, Story Updates, Reports
- Helper functions for common operations
- Proper indexing for performance

### ✅ TypeScript Types
- Fully typed database schema
- Type-safe Supabase client
- Helper types for common operations

### ✅ Utilities & Helpers
- Date formatting
- File validation
- Text truncation
- Initials generation
- And more in `lib/helpers.ts`

## 🎨 UI Components

All shadcn/ui components are pre-installed:
- Button, Card, Input, Label, Form
- Select, Textarea, Avatar, Badge
- Dropdown Menu, Dialog, Tabs

Import and use them:

```tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

<Button>Click Me</Button>
```

## 📂 Project Structure

```
app/              → Pages and routes
components/       → Reusable components
  ui/             → shadcn/ui components
  layout/         → Header, Footer
  features/       → Feature-specific components
lib/              → Utilities and configurations
  supabase/       → Supabase clients
hooks/            → Custom React hooks
types/            → TypeScript types
supabase/         → Database schema
```

## 🚀 Next Steps

### 1. Implement Authentication

Connect the login/signup forms to Supabase Auth:

```tsx
// Example: In your login form
const supabase = createClient()
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
})
```

### 2. Build Beneficiary Management

Create forms to add/edit beneficiaries:

```tsx
const { data, error } = await supabase
  .from('beneficiaries')
  .insert({
    name,
    program_type,
    enrolled_date,
    organization_id,
  })
```

### 3. Implement Story Collection

Build the story update form with photo upload:

```tsx
// Upload photo to Supabase Storage
const { data: uploadData } = await supabase.storage
  .from('story-photos')
  .upload(`${beneficiaryId}/${Date.now()}.jpg`, file)

// Save story update
const { data, error } = await supabase
  .from('story_updates')
  .insert({
    beneficiary_id,
    photo_url: uploadData.path,
    notes,
    metrics,
  })
```

### 4. Create Dashboard Analytics

Fetch and display real data:

```tsx
const { data: stats } = await supabase
  .from('beneficiaries')
  .select('*')
  .eq('organization_id', orgId)
```

### 5. Implement Report Generation

Use React-PDF to generate reports:

```tsx
import { Document, Page, Text, View } from '@react-pdf/renderer'

const MyReport = () => (
  <Document>
    <Page>
      <View>
        <Text>Impact Report</Text>
      </View>
    </Page>
  </Document>
)
```

## 📚 Documentation

- **README.md** - Project overview and features
- **SETUP.md** - Detailed setup instructions
- **ARCHITECTURE.md** - Technical architecture documentation
- **This file** - Quick start guide

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs) - Learn Next.js
- [Supabase Docs](https://supabase.com/docs) - Learn Supabase
- [Tailwind CSS](https://tailwindcss.com/docs) - Learn Tailwind
- [shadcn/ui](https://ui.shadcn.com) - Component documentation

## 💡 Pro Tips

1. **Start with one feature at a time** - Build authentication first, then beneficiaries, then stories
2. **Use the types** - All database operations are fully typed
3. **Test with real data** - Add sample data in Supabase to see how everything looks
4. **Mobile-first** - Design works on mobile first, then desktop
5. **Check RLS policies** - Make sure your Supabase RLS policies are working correctly

## 🐛 Troubleshooting

**Dev server won't start?**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

**Build fails?**
- Remove `.env.local` if it has placeholder values
- Make sure all imports are correct
- Run `npm run build` to see errors

**Supabase errors?**
- Verify your `.env.local` has correct credentials
- Check that you've run the `schema.sql` file
- Verify RLS policies are enabled

## 🎉 You're Ready!

The foundation is solid. Start building features incrementally:

1. ✅ Project setup - DONE
2. ✅ UI/UX foundation - DONE
3. ✅ Database schema - DONE
4. → Implement authentication
5. → Build CRUD operations
6. → Add data visualization
7. → Implement PDF generation

Happy coding! 🚀

