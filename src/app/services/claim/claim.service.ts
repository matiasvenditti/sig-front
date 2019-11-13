import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClaimDTO } from '../../dto/claim-dto';
import { ClaimApi } from './claim-routes';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ClaimDTO[]>(ClaimApi.get.findAll());
  }

  create(claim: ClaimDTO) {
    return this.http.post<ClaimDTO>(ClaimApi.post.create(), claim);
  }

  delete(claimId: number) {
    return this.http.delete(ClaimApi.delete.delete(claimId));
  }

  resolve(claim: ClaimDTO) {
    return this.http.post(ClaimApi.post.resolve(), claim);
  }
}
