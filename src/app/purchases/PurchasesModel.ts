export class PurchasesModel {
  id: string;
  type: string;
  refProduct: {
    type: string;
    value: string;
  };
  refClient: {
    type: string;
    value: string;
  };
  discounts: {
    type: string;
    value: string;
  };
  finalPrice: {
    type: string;
    value: string;
  };
  date: {
    type: Date;
    value: string;
  };
}
