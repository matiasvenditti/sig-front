import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TruckApi } from './truck.routing';
import { TruckDTO } from 'src/app/dto/truck-dto';

@Injectable({
  providedIn: 'root'
})
export class TruckService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<TruckDTO[]>(TruckApi.get.findAll());
  }

  create(truck: TruckDTO) {
    return this.http.post<TruckDTO>(TruckApi.post.create(), truck);
  }

  delete(truckId: number) {
    return this.http.delete(TruckApi.delete.delete(truckId));
  }

  update(truckId: number, truck: TruckDTO) {
    return this.http.put(TruckApi.put.update(truckId), truck);
  }
}
