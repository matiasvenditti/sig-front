import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDTO } from 'src/app/dto/procuct-dto';
import { ProductApi } from './product.routes';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ProductDTO[]>(ProductApi.get.findAll());
  }

  create(product: ProductDTO) {
    return this.http.post<ProductDTO>(ProductApi.post.create(), product);
  }

  delete(productId: number) {
    return this.http.delete(ProductApi.delete.delete(productId));
  }

  update(productId: number, product: ProductDTO) {
    return this.http.put(ProductApi.put.update(productId), product);
  }
}
