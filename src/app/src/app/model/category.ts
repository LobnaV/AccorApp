export class Category {
  
    constructor(
      public id?: number,
      public name?: string,
      public approvalLimitGM?: string,
      public approvalLimitN1?: string,
      public approvalLimitN2?: string
    ) {
    }
  }