import { Order } from "../domain/purchases/order";

export interface ISubmitRequest {
  total: number;
  customerDocument: string;
}

export interface ISubmitResponse {}

export class SubmitOrder {
  public async execute({ total, customerDocument }: ISubmitRequest) {
    // ...Implementação das regras do negócio.
    const order = new Order(total, customerDocument);

    // Persistir no banco de dados.
  }
}
