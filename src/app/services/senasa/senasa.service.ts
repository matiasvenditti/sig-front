import { Injectable } from '@angular/core';
import { SenasaApi } from './senasa.routes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Senasa } from 'src/app/model/senasa';

@Injectable({
  providedIn: 'root'
})
export class SenasaService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(SenasaApi.get.findAll());
  }

  create(senasa: Senasa) {
    return this.http.post(SenasaApi.post.create(), senasa);
  }
}
