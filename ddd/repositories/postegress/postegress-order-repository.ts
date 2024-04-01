import { Order } from "../../domain/purchases/order";

import { OrderRepository } from "../orderRepository";

export class PostegressOrderRepository implements OrderRepository {
    public async create(order: Order): Promise<void> {
        // Salva order
    }
}
