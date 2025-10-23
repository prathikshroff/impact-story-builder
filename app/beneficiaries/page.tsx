import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AddBeneficiaryDialog } from '@/components/features/beneficiaries/AddBeneficiaryDialog'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/helpers'
import { User } from 'lucide-react'

export default async function BeneficiariesPage() {
  const supabase = await createServerSupabaseClient()
  let beneficiaries = []

  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { data, error } = await supabase
        .from('beneficiaries')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching beneficiaries:', error)
      }
      
      beneficiaries = data || []
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Beneficiaries</h1>
            <p className="text-muted-foreground">
              Manage your program participants and track their progress
            </p>
          </div>
          <AddBeneficiaryDialog />
        </div>

        {/* Beneficiaries List or Empty State */}
        {beneficiaries.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No beneficiaries yet</CardTitle>
              <CardDescription>
                Get started by adding your first program participant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="mb-4 text-sm text-muted-foreground max-w-md">
                  Beneficiaries are the people your organization serves. Add them here to
                  start tracking their journey and collecting impact stories.
                </p>
                <AddBeneficiaryDialog />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {beneficiaries.map((beneficiary: any) => (
              <Card key={beneficiary.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{beneficiary.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {beneficiary.program_type}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Enrolled: {formatDate(beneficiary.enrolled_date)}
                    </div>
                    <Badge
                      variant={
                        beneficiary.status === 'active'
                          ? 'default'
                          : beneficiary.status === 'graduated'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {beneficiary.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

