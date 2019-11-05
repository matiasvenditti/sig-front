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

  findValid() {
    return this.http.get<ProductItemDTO[]>(OrderItemApi.get.findValid());
  }
}
