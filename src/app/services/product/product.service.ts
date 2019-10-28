import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDTO } from 'src/app/model/procuct';
import { ProductApi } from './product.routes';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ProductDTO[]>(ProductApi.get.findAll());
  }

  create(senasa: ProductDTO) {
    return this.http.post<ProductDTO>(ProductApi.post.create(), senasa);
  }

  delete(senasaId: number) {
    return this.http.delete(ProductApi.delete.delete(senasaId));
  }
}
