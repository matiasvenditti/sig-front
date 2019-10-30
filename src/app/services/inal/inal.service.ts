import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InalDTO } from 'src/app/dto/inal-dto';
import { InalApi } from './inal.routes';

@Injectable({
  providedIn: 'root'
})
export class InalService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<InalDTO[]>(InalApi.get.findAll());
  }

  create(inal: InalDTO) {
    return this.http.post<InalDTO>(InalApi.post.create(), inal);
  }

  delete(inalId: number) {
    return this.http.delete(InalApi.delete.delete(inalId));
  }

  update(inalId: number, inal: InalDTO) {
    return this.http.put(InalApi.put.update(inalId), inal);
  }
}
