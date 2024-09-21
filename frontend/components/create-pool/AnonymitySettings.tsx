import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { FormField } from "../ui/form-field"

export function AnonymitySettings({
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
        <CardTitle>Anonymity Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="anonymous-voting">Anonymous Voting</Label>
          <Switch
            id="anonymous-voting"
            checked={poolParams.isAnonymousVoting}
            onCheckedChange={(checked) => {
              setPoolParams((prev: any) => ({
                ...prev,
                isAnonymousVoting: checked,
              }))
            }}
          />
        </div>
        <FormField
          label="Commitment Deposit"
          type="number"
          id="commitmentDeposit"
          name="commitmentDeposit"
          placeholder="Commitment Deposit (in wei)"
          value={poolParams.commitmentDeposit}
          onChange={handleChange}
        />
        <FormField
          label="Min Bid Amount"
          type="number"
          id="minBidAmount"
          name="minBidAmount"
          placeholder="Min Bid Amount (in wei)"
          value={poolParams.minBidAmount}
          onChange={handleChange}
        />
        <FormField
          label="Max Bid Amount"
          id="maxBidAmount"
          type="number"
          name="maxBidAmount"
          value={poolParams.maxBidAmount}
          onChange={handleChange}
        />
      </CardContent>
    </Card>
  )
}
