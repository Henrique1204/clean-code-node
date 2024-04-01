import { Order } from "../domain/purchases/order";

export interface OrderRepository {
  create(order: Order): Promise<void>;
}
