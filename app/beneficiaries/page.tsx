import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'

export default function BeneficiariesPage() {
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
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Beneficiary
          </Button>
        </div>

        {/* Empty State */}
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
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Beneficiary
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

