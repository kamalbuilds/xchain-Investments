import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export function AnonymitySettings() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Anonymity Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="anonymous-donations">Anonymous Donations</Label>
            <Switch id="anonymous-donations" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="anonymous-voting">Anonymous Voting</Label>
            <Switch id="anonymous-voting" />
          </div>
        </CardContent>
      </Card>
    )
  }
