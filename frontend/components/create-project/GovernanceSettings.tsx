import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField } from "@/components/ui/form-field"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function GovernanceSettings({
  poolParams,
  setPoolParams,
  handleChange,
}: {
  poolParams: any
  setPoolParams: any
  handleChange: any
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Governance Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          label="Deposit Period Days"
          type="number"
          id="depositPeriodDays"
          name="depositPeriodDays"
          placeholder="Deposit Period Days"
          value={poolParams.depositPeriodDays}
          onChange={handleChange}
        />
        <FormField
          label="Withdraw Period Days"
          type="number"
          id="withdrawPeriodDays"
          name="withdrawPeriodDays"
          placeholder="Withdraw Period Days"
          value={poolParams.withdrawPeriodDays}
          onChange={handleChange}
        />

        <FormField
          label="Submission deadline"
          type="number"
          id="bidSubmissionDeadline"
          name="bidSubmissionDeadline"
          placeholder="Bid Submission Deadline (days)"
          value={poolParams.bidSubmissionDeadline}
          onChange={handleChange}
        />
        <FormField
          label="Penalty Rate"
          type="number"
          id="penaltyRate"
          name="penaltyRate"
          placeholder="Penalty Rate(%)"
          value={poolParams.penaltyRate}
          onChange={handleChange}
        />

        <div className="flex items-center justify-between">
          <Label htmlFor="distributeRemainingCycle">
            Distribute Remaining Cycle?
          </Label>
          <Switch
            id="distributeRemainingCycle"
            checked={poolParams.distributeRemainingCycle}
            onCheckedChange={(checked) => {
              setPoolParams((prev) => ({
                ...prev,
                distributeRemainingCycle: checked,
              }))
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
