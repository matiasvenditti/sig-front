import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SupplierDTO } from 'src/app/dto/suppliet-dto';
import { SupplierApi } from './supplier.routes';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<SupplierDTO[]>(SupplierApi.get.findAll());
  }

  create(senasa: SupplierDTO) {
    return this.http.post<SupplierDTO>(SupplierApi.post.create(), senasa);
  }

  delete(supplierId: number) {
    return this.http.delete(SupplierApi.delete.delete(supplierId));
  }

  update(supplierId: number, supplier: SupplierDTO) {
    return this.http.put(SupplierApi.put.update(supplierId), supplier);
  }
}
