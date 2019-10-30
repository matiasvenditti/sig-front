import { Injectable } from '@angular/core';
import { SenasaApi } from './senasa.routes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Senasa } from 'src/app/model/senasa';
import { SenasaDTO } from 'src/app/dto/senasa-dto';

@Injectable({
  providedIn: 'root'
})
export class SenasaService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Senasa[]>(SenasaApi.get.findAll());
  }

  create(senasa: SenasaDTO) {
    return this.http.post<Senasa>(SenasaApi.post.create(), senasa);
  }

  delete(senasaId: number) {
    return this.http.delete(SenasaApi.delete.delete(senasaId));
  }

  update(senasaId: number, senasa: SenasaDTO) {
    return this.http.put(SenasaApi.put.update(senasaId), senasa);
  }
}
