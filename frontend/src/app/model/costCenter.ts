import { Param } from "./param";

export class CostCenter {
    constructor(
      public id?: number,
      public code?: string,
      public label?: string,
      public owner?: string,
      public company?:Param
    ) {}
  }