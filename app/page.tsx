import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Heart, 
  Camera, 
  CalendarClock, 
  FileText, 
  Users, 
  BarChart3, 
  Smartphone,
  CheckCircle2
} from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container flex flex-col items-center gap-8 py-20 md:py-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
            ✨ Transform Your Impact Reporting
          </div>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Turn Your Success Stories Into
            <span className="text-primary"> Powerful Impact Reports</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Help your non-profit collect, organize, and share compelling impact stories 
            with donors and stakeholders. No more scattered updates or manual reporting.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row mt-4">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Get Started Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Image/Illustration Placeholder */}
        <div className="mt-12 w-full max-w-5xl">
          <div className="rounded-lg border bg-muted/50 p-8 md:p-12">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="text-center">
                <Heart className="h-20 w-20 mx-auto text-primary/40" />
                <p className="mt-4 text-sm text-muted-foreground">Demo Preview Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="border-t bg-muted/40 py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">The Challenge</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Non-profits have amazing success stories, but struggle to:
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Collect updates consistently from field staff',
                  'Organize scattered photos and progress notes',
                  'Create professional reports for different audiences',
                  'Demonstrate impact with data and narratives',
                  'Share stories quickly when opportunities arise'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight">Our Solution</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Impact Story Builder makes it easy to:
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Capture beneficiary updates with simple mobile forms',
                  'Automatically build chronological impact timelines',
                  'Generate beautiful reports with one click',
                  'Customize presentations for donors, grants, or social media',
                  'Show your impact with compelling visuals and data'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-20 md:py-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything You Need to Share Your Impact
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete platform built specifically for non-profit impact reporting
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {[
            {
              icon: Camera,
              title: 'Story Collection',
              description: 'Simple mobile-friendly forms for program staff to capture photos, notes, and progress updates from the field.',
            },
            {
              icon: CalendarClock,
              title: 'Automatic Timelines',
              description: 'Watch beneficiary journeys unfold with chronological timelines that organize all updates automatically.',
            },
            {
              icon: FileText,
              title: 'Professional Reports',
              description: 'Generate polished PDF reports combining narratives, photos, and data in minutes, not hours.',
            },
            {
              icon: Users,
              title: 'Beneficiary Management',
              description: 'Track all your program participants, their demographics, and enrollment status in one place.',
            },
            {
              icon: BarChart3,
              title: 'Impact Dashboard',
              description: 'Visualize your programs performance with charts and aggregate metrics across all beneficiaries.',
            },
            {
              icon: Smartphone,
              title: 'Mobile-First Design',
              description: 'Works perfectly on phones and tablets so field staff can update from anywhere, even offline.',
            },
          ].map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-t bg-muted/40 py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From data collection to beautiful reports in three simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mt-12">
            {[
              {
                step: '01',
                title: 'Add Beneficiaries',
                description: 'Create profiles for program participants with basic info like name, program type, and enrollment date.',
              },
              {
                step: '02',
                title: 'Collect Updates',
                description: 'Staff add progress updates with photos and notes as beneficiaries achieve milestones and reach goals.',
              },
              {
                step: '03',
                title: 'Generate Reports',
                description: 'Select the stories and timeframe, choose your template, and generate a professional PDF report instantly.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="mb-4 text-6xl font-bold text-primary/20">{item.step}</div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 md:py-32">
        <div className="rounded-lg border bg-muted/50 p-8 md:p-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to Transform Your Impact Reporting?
            </h2>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Join non-profits already using Impact Story Builder to share their success stories 
              and demonstrate their impact to donors and stakeholders.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row mt-4">
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  Start Building Stories
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact">
                  Schedule a Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
