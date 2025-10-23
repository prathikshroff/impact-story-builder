# Architecture Documentation

## Overview

Impact Story Builder is built with a modern, scalable architecture using Next.js 14 App Router, Supabase for backend services, and TypeScript for type safety.

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **Lucide React** - Icon library

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - File storage
  - Row Level Security (RLS)
  - Real-time subscriptions (future)

### Additional Libraries
- **Recharts** - Data visualization
- **React-PDF** - PDF generation
- **date-fns** - Date manipulation

## Project Structure

```
impact-story-builder/
│
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout with header/footer
│   ├── page.tsx                 # Landing page
│   ├── auth/                    # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── callback/            # OAuth callback handler
│   ├── dashboard/               # Main dashboard
│   ├── beneficiaries/           # Beneficiary management
│   ├── stories/                 # Story collection
│   ├── reports/                 # Report generation
│   ├── settings/                # User settings
│   ├── organization/            # Organization management
│   └── globals.css              # Global styles
│
├── components/
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # App header with navigation
│   │   └── Footer.tsx           # App footer
│   └── features/                # Feature-specific components
│       ├── auth/
│       ├── beneficiaries/
│       ├── stories/
│       ├── reports/
│       └── dashboard/
│
├── lib/
│   ├── supabase/                # Supabase client configuration
│   │   ├── client.ts            # Browser client
│   │   ├── server.ts            # Server client
│   │   └── middleware.ts        # Auth middleware utilities
│   ├── utils.ts                 # shadcn/ui utility functions
│   ├── constants.ts             # App constants
│   └── helpers.ts               # Helper functions
│
├── hooks/                        # Custom React hooks
│   └── useUser.ts               # User authentication hook
│
├── types/                        # TypeScript type definitions
│   ├── database.ts              # Supabase database types
│   └── index.ts                 # Exported types
│
├── supabase/
│   └── schema.sql               # Database schema
│
├── middleware.ts                 # Next.js middleware (auth protection)
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── components.json              # shadcn/ui configuration
```

## Data Flow

### Authentication Flow

1. User submits login/signup form
2. Client-side form validation
3. Call Supabase Auth API
4. Supabase returns session token
5. Token stored in HTTP-only cookies
6. Middleware checks auth on protected routes
7. User data fetched and cached via `useUser` hook

### Data Fetching Flow

1. Component calls Supabase client (browser or server)
2. Supabase client includes auth token automatically
3. RLS policies validate user access
4. Data returned and rendered
5. Loading and error states handled gracefully

### File Upload Flow

1. User selects photo in form
2. File validated (size, type)
3. Upload to Supabase Storage
4. Storage URL returned
5. URL saved in database record
6. Image displayed via Supabase CDN

## Database Architecture

### Multi-Tenancy

The app uses a **shared database, row-level security** approach:

- All organizations share the same database tables
- `organization_id` column on each table links data to organizations
- RLS policies ensure users can only access their organization's data
- Provides excellent scalability and data isolation

### Key Tables

1. **organizations** - Organization profiles
2. **users** - Extended user profiles (links to auth.users)
3. **beneficiaries** - Program participants
4. **story_updates** - Individual story entries with photos/metrics
5. **reports** - Generated impact reports

### Relationships

```
organizations (1) ──── (many) users
organizations (1) ──── (many) beneficiaries
organizations (1) ──── (many) reports
beneficiaries (1) ──── (many) story_updates
users (1) ──── (many) story_updates (as creator)
users (1) ──── (many) reports (as generator)
```

## Security

### Row Level Security (RLS)

Every table has RLS policies that:
- Check user authentication
- Verify organization membership
- Enforce role-based permissions

### Role-Based Access Control (RBAC)

Three roles with different permissions:

- **Admin**: Full access to organization data, settings, and user management
- **Staff**: Can manage beneficiaries, create stories, generate reports
- **Volunteer**: Can view stories and add updates (limited edit)

### Authentication

- Email/password authentication via Supabase Auth
- Session tokens stored in HTTP-only cookies
- Middleware protects all authenticated routes
- Automatic token refresh on each request

## Performance Considerations

### Optimizations

1. **Static Generation** - Landing page and marketing pages are statically generated
2. **Indexing** - Database indexes on frequently queried columns
3. **Image Optimization** - Next.js Image component for automatic optimization
4. **Code Splitting** - Dynamic imports for heavy components
5. **Caching** - React Server Components cache by default

### Future Optimizations

- Implement ISR (Incremental Static Regeneration) for dashboard
- Add Redis caching for frequently accessed data
- Implement pagination for large datasets
- Add real-time updates via Supabase Realtime
- Optimize images with WebP and AVIF formats

## Scalability

The architecture is designed to scale:

### Horizontal Scaling
- Next.js deploys easily to Vercel, AWS, or any Node.js host
- Supabase scales automatically
- CDN for static assets and images

### Database Scaling
- PostgreSQL with connection pooling
- Read replicas for high-traffic scenarios
- Supabase handles most scaling automatically

### File Storage Scaling
- Supabase Storage backed by S3
- Global CDN distribution
- Automatic image transformations

## Development Workflow

### Local Development

1. Install dependencies: `npm install`
2. Set up environment variables
3. Run dev server: `npm run dev`
4. Make changes and test locally
5. Run linter: `npm run lint`
6. Build for production: `npm run build`

### Type Safety

- TypeScript enforces type checking at compile time
- Database types generated from Supabase schema
- Supabase client is fully typed
- No `any` types in production code

### Code Quality

- ESLint for code linting
- TypeScript for type checking
- Component-driven development
- Consistent file and folder structure

## Deployment

### Recommended: Vercel

1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically on push to main

### Alternative: Docker

A Dockerfile can be added for containerized deployment.

### Environment Variables

Required for production:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional:
- `SUPABASE_SERVICE_ROLE_KEY` (for admin operations)

## Future Enhancements

### Technical Improvements

- [ ] Add Redis for caching
- [ ] Implement real-time updates
- [ ] Add full-text search
- [ ] Implement offline support with service workers
- [ ] Add automated testing (Jest, Playwright)
- [ ] Set up CI/CD pipeline
- [ ] Add monitoring and error tracking (Sentry)
- [ ] Implement analytics (PostHog)

### Feature Additions

- [ ] Email notifications
- [ ] SMS updates
- [ ] Multi-language support
- [ ] Advanced reporting with custom templates
- [ ] Data export (CSV, Excel)
- [ ] API for third-party integrations
- [ ] Mobile app (React Native)

## Contributing

When contributing to the codebase:

1. Follow the existing file structure
2. Use TypeScript with proper types
3. Write clean, readable code with comments
4. Test thoroughly before committing
5. Update documentation as needed

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

