import { Injectable } from '@angular/core';
import { OrderState } from '../model/order-state';
import {OrderItemState} from '../model/order-item-state';

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

  inForthStep(state: string): boolean {
    return OrderItemState.QUALITY === state;
  }

  inFifthStep(state: string): boolean {
    return OrderItemState.STOCK === state;
  }

  inNonConformity(state: string): boolean {
    return OrderItemState.NONCONFORMITY === state;
  }
}
