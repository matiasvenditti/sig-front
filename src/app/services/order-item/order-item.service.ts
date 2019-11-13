import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductItemDTO } from 'src/app/dto/product-item-dto';
import { OrderItemApi } from './order-item-routes';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  constructor(private http: HttpClient) { }

  setState(productItem: ProductItemDTO) {
    return this.http.put(OrderItemApi.put.update(productItem.id), productItem);
  }

  findQuality() {
    return this.http.get<ProductItemDTO[]>(OrderItemApi.get.findQuality());
  }

  findStock() {
    return this.http.get<ProductItemDTO[]>(OrderItemApi.get.findStock());
  }

  findNonConformity() {
    return this.http.get<ProductItemDTO[]>(OrderItemApi.get.findNonConformity());
  }

  findValid() {
    return this.http.get<ProductItemDTO[]>(OrderItemApi.get.findValid());
  }

  distribute(orderItem: ProductItemDTO, orderItemState: string) {
    return this.http.post<ProductItemDTO>(OrderItemApi.post.distribute(), {orderItem, type: orderItemState});
  }

  remove(productItemId: number) {
    return this.http.delete(OrderItemApi.delete.delete(productItemId));
  }
}
