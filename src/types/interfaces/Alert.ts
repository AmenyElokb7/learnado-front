export interface Alert {
    open: boolean;
    message: string;
    type: ALertType;
  }
  
  export type ALertType = "error" | "success" | "info" | "warning";
  