import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DriverDTO } from 'src/app/dto/driver-dto';
import { DriverApi } from './driver.routes';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<DriverDTO[]>(DriverApi.get.findAll());
  }

  create(driver: DriverDTO) {
    return this.http.post<DriverDTO>(DriverApi.post.create(), driver);
  }

  delete(driverId: number) {
    return this.http.delete(DriverApi.delete.delete(driverId));
  }
}
