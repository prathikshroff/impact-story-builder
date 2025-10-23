import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'

export default function ReportsPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Impact Reports</h1>
            <p className="text-muted-foreground">
              Generate and manage professional impact reports
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        {/* Empty State */}
        <Card>
          <CardHeader>
            <CardTitle>No reports generated yet</CardTitle>
            <CardDescription>
              Create beautiful reports to share your impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="mb-4 text-sm text-muted-foreground max-w-md">
                Once you&apos;ve collected story updates, you can generate professional PDF
                reports customized for donors, grants, board meetings, or social media.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Generate Your First Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

