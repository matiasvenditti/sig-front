import { Injectable } from '@angular/core';
import { OrderState } from '../model/order-state';

@Injectable({
  providedIn: 'root'
})
export class StateManagerService {

  constructor() { }

  inFirstStep(state: string): boolean {
    return OrderState.COMING === state;
  }

  inSecondStep(state: string): boolean {
    return OrderState.PLANT === state;
  }
}
