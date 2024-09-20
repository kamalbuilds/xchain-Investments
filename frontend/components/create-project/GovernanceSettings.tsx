import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField } from '@/components/ui/form-field'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export function GovernanceSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Governance Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField label="Voting Period (in days)" id="voting-period" type="number" />
        <FormField label="Quorum Percentage" id="quorum-percentage" type="number" />
        <div className="flex items-center justify-between">
          <Label htmlFor="allow-delegation">Allow Vote Delegation</Label>
          <Switch id="allow-delegation" />
        </div>
      </CardContent>
    </Card>
  )
}
