# Impact Story Builder

A powerful web application that helps non-profit organizations collect, organize, and share compelling impact stories with donors and stakeholders.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## 🌟 Overview

Non-profits struggle to demonstrate their impact effectively. They have great stories but lack a systematic way to collect, organize, and present them with supporting data. Impact Story Builder bridges that gap by making it easy to:

- ✅ Collect beneficiary updates with photos and basic metrics
- ✅ Automatically organize these into timeline-based impact stories
- ✅ Generate professional reports for donors, grants, and board presentations
- ✅ Customize reports for different audiences

## 🚀 Tech Stack

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Supabase (PostgreSQL database, authentication, file storage)
- **UI Components**: shadcn/ui
- **Charts**: Recharts for data visualization
- **PDF Generation**: React-PDF for report generation

## 📦 Prerequisites

Before you begin, ensure you have installed:

- Node.js 18.x or higher
- npm or yarn
- A Supabase account (free tier is sufficient to start)

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd impact-story-builder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to [Supabase](https://app.supabase.com) and create a new project
2. Once your project is ready, go to **Project Settings** → **API**
3. Copy your project URL and anon/public key
4. In the SQL Editor, run the setup script from `supabase/schema.sql` (see Database Setup section below)

### 4. Configure Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🗄️ Database Setup

The database schema is located in `supabase/schema.sql`. To set up your database:

1. Open your Supabase project
2. Navigate to the **SQL Editor**
3. Copy and paste the contents of `supabase/schema.sql`
4. Run the query

The schema includes:

- **organizations**: Store non-profit organization details
- **users**: Extended user profiles with role-based access
- **beneficiaries**: Program participants/beneficiaries
- **story_updates**: Individual story updates with photos and metrics
- **reports**: Generated impact reports

All tables include Row Level Security (RLS) policies to ensure data isolation between organizations.

## 📁 Project Structure

```
impact-story-builder/
├── app/                      # Next.js 14 app directory
│   ├── layout.tsx           # Root layout with Header/Footer
│   ├── page.tsx             # Landing page
│   ├── auth/                # Authentication pages
│   ├── dashboard/           # Main dashboard
│   ├── beneficiaries/       # Beneficiary management
│   ├── stories/             # Story collection
│   └── reports/             # Report generation
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # Header, Footer, Navigation
│   └── features/            # Feature-specific components
│       ├── auth/
│       ├── beneficiaries/
│       ├── stories/
│       ├── reports/
│       └── dashboard/
├── lib/
│   ├── supabase/            # Supabase client configuration
│   │   ├── client.ts        # Browser client
│   │   ├── server.ts        # Server client
│   │   └── middleware.ts    # Auth middleware
│   └── utils.ts             # Utility functions
├── hooks/                    # Custom React hooks
│   └── useUser.ts           # User authentication hook
├── types/                    # TypeScript type definitions
│   ├── database.ts          # Supabase database types
│   └── index.ts             # Exported types
└── supabase/
    └── schema.sql           # Database schema and RLS policies
```

## 🔐 Authentication & Authorization

The app uses Supabase Authentication with email/password by default. The middleware (`middleware.ts`) protects routes that require authentication.

### User Roles

- **Admin**: Full access to organization settings and all features
- **Staff**: Can add/edit beneficiaries and stories, generate reports
- **Volunteer**: Can view stories and add updates (limited edit access)

## 🎨 Styling

This project uses Tailwind CSS with shadcn/ui components for a consistent, accessible, and beautiful UI. The design is:

- Fully responsive (mobile-first)
- Accessible (WCAG 2.1 compliant)
- Dark mode ready
- Customizable via Tailwind config

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (add `.prettierrc` if needed)

## 📝 Key Features to Implement Next

1. **Authentication Pages**
   - Sign up flow with organization creation
   - Login page
   - Password reset

2. **Dashboard**
   - Overview metrics
   - Recent stories
   - Quick actions

3. **Beneficiary Management**
   - Add/edit beneficiary profiles
   - List view with search and filters
   - Individual beneficiary timeline view

4. **Story Collection**
   - Mobile-optimized form
   - Photo upload to Supabase Storage
   - Metrics input (custom fields)
   - Offline support with local storage

5. **Report Generation**
   - Template selection
   - Story/date range selection
   - PDF generation with React-PDF
   - Save and share reports

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database and Auth by [Supabase](https://supabase.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

## 📧 Support

For questions or support, please open an issue on GitHub.

---

Made with ❤️ for non-profits making a difference
