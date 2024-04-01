import { SubmitOrder } from "./useCases/submit-order";

import { PostegressOrderRepository } from "./repositories/postegress/postegress-order-repository";


const submitOrder = new SubmitOrder(new PostegressOrderRepository());

