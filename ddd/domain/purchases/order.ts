export class Order {
  public createdDate: Date;
  public total: number;
  public customerDocument: string;

  constructor(total: number, customerDocument: string) {
    this.createdDate = new Date();
    this.total = total;
    this.customerDocument = customerDocument;
  }
}
