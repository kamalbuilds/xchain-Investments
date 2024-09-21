export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export type Pool = {
  id: number
  poolId: number
  name: string
  title: string
  depositAmount: string
  isAnonymousVoting: boolean
  depositPeriodDays: number
  withdrawPeriodDays: number
  distributeRemainingCycle: boolean
  valueStored: string
  minBidAmount: string
  maxBidAmount: string
  commitmentDeposit: string
  penaltyRate: number
  memberCount: number
  bidSubmissionDeadline: number
  currentCycle: number
}
