import { Order } from "../domain/purchases/order";

import { OrderRepository } from "../repositories/orderRepository";

export interface ISubmitRequest {
  total: number;
  customerDocument: string;
}

export interface ISubmitResponse {}

export class SubmitOrder {
    constructor(private ordersRepositorys: OrderRepository) {}

  public async execute({ total, customerDocument }: ISubmitRequest) {
    // ...Implementação das regras do negócio.
    const order = new Order(total, customerDocument);

    // Persistir no banco de dados.
    await this.ordersRepositorys.create(order);
  }
}
