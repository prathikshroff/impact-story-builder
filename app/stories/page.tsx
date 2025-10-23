import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'

export default function StoriesPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Story Updates</h1>
            <p className="text-muted-foreground">
              Collect and view impact stories from your programs
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Story Update
          </Button>
        </div>

        {/* Empty State */}
        <Card>
          <CardHeader>
            <CardTitle>No story updates yet</CardTitle>
            <CardDescription>
              Start documenting the impact of your programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="mb-4 text-sm text-muted-foreground max-w-md">
                Story updates capture the progress and milestones of your beneficiaries.
                Add photos, notes, and metrics to build compelling impact stories.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Story Update
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

