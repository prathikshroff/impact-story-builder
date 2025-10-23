# Impact Story Builder - Setup Guide

This guide will walk you through setting up the Impact Story Builder application from scratch.

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- A Supabase account (free tier works great!)

## 🚀 Step 1: Install Dependencies

The dependencies should already be installed, but if not:

```bash
npm install
```

## 🗄️ Step 2: Set Up Supabase

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - **Name**: Impact Story Builder
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
5. Wait for your project to be created (takes ~2 minutes)

### Get Your API Credentials

1. Once your project is ready, go to **Project Settings** (gear icon in sidebar)
2. Navigate to **API** section
3. You'll need two values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

### Set Up the Database

1. In your Supabase project, go to the **SQL Editor** (in the sidebar)
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Paste it into the SQL editor
5. Click **Run** (or press Cmd/Ctrl + Enter)

This will create all the necessary tables, indexes, Row Level Security policies, and helper functions.

### Set Up Storage (Optional - for photo uploads)

1. Go to **Storage** in your Supabase dashboard
2. Click **Create a new bucket**
3. Name it `story-photos`
4. Make it **public** (check the public checkbox)
5. Click **Create Bucket**

## 🔐 Step 3: Configure Environment Variables

1. Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

2. Open `.env.local` and replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ **Important**: Never commit `.env.local` to version control! It's already in `.gitignore`.

## 🏃 Step 4: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## ✅ Verify Everything Works

1. **Landing Page**: You should see the Impact Story Builder landing page
2. **Navigation**: Click through the header navigation links
3. **Auth Pages**: Visit `/auth/signup` and `/auth/login` to see the auth forms

## 🎨 Step 5: Customize (Optional)

### Update Organization Settings

Once you've set everything up, you can customize:

- App name and description in `lib/constants.ts`
- Colors and styling in `tailwind.config.ts` and `app/globals.css`
- Metadata in `app/layout.tsx`

## 🧪 Step 6: Test Authentication

To test the full authentication flow:

1. Go to `/auth/signup`
2. Enter organization details and create an account
3. Check your email for the confirmation link
4. After confirming, you'll be redirected to the dashboard

Note: The auth forms are currently UI-only. You'll need to implement the actual authentication logic by connecting them to Supabase Auth.

## 🛠️ Common Issues & Solutions

### Issue: Build fails with "Invalid supabaseUrl"

**Solution**: Make sure you've created a `.env.local` file with valid Supabase credentials, or remove the `.env.local` file entirely if it contains placeholder values.

### Issue: Database queries fail

**Solution**: Verify that you've run the `supabase/schema.sql` file in your Supabase SQL Editor.

### Issue: Pages redirect to login

**Solution**: The middleware protects certain routes. To develop without auth, you can temporarily comment out the middleware checks, or make sure Supabase isn't configured (.env.local doesn't exist or has placeholder values).

### Issue: Images don't upload

**Solution**: Make sure you've created the `story-photos` storage bucket in Supabase and it's set to public.

## 📚 Next Steps

Now that your app is set up, here's what to build next:

1. **Implement Authentication** - Connect the login/signup forms to Supabase Auth
2. **Beneficiary CRUD** - Build forms to create, read, update, and delete beneficiaries
3. **Story Collection** - Create the story update form with photo upload
4. **Dashboard** - Fetch and display real data from Supabase
5. **Report Generation** - Implement PDF generation with React-PDF

Check the main `README.md` for the full roadmap and feature list.

## 🤝 Need Help?

- Check the [Supabase Documentation](https://supabase.com/docs)
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review the [shadcn/ui Documentation](https://ui.shadcn.com)

## 📝 Development Tips

- Use TypeScript! All types are defined in `types/database.ts` and `types/index.ts`
- Follow the existing component structure for consistency
- Test with real data in Supabase as early as possible
- Use the helper functions in `lib/helpers.ts` for common operations
- Keep components small and focused on a single responsibility

Happy coding! 🎉

