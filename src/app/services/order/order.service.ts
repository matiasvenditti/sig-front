import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDTO } from 'src/app/dto/order-dto';
import { OrderApi } from './order.routes';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<OrderDTO[]>(OrderApi.get.findAll());
  }

  create(order: OrderDTO) {
    return this.http.post<OrderDTO>(OrderApi.post.create(), order);
  }

  delete(productId: number) {
    return this.http.delete(OrderApi.delete.delete(productId));
  }

  update(orderId: number, order: OrderDTO) {
    return this.http.put(OrderApi.put.update(orderId), order);
  }
}
