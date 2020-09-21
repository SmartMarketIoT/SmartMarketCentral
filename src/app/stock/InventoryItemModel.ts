export class InventoryItemModel {
  id: string;
  type: string;
  refProduct: {
    type: string;
    value: string;
  };
  rfid: {
    type: string;
    value: string;
  };
  refPurchase: {
    type: string;
    value: string;
  };
}
