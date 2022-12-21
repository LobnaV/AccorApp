export class CsvFormat {
  constructor(
    public branchId?: string,
    public home?: string,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public state?: string,
    public manager?: string,
    public approvalLimit?: string,
    public spendLimit?: string,
    public ownedCostCenter?: string,
    public userType?: string
  ) {
  }
}
