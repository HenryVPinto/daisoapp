export interface Security {
  result: {
    error: number;
    message: string;
  };
  infoUser: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    typeUser: string;
    idPlanSale: number;
    token: string;
  };
}
