export class ProductModel {
  id: string;
  type: string;
  name: {
    type: string;
    value: string;
  };
  price: {
    type: string;
    value: number;
  };
  img: {
    type: string;
    value: string;
  };
  category: {
    type: string;
    value: string;
  };
}
