import {Component, Input, OnInit} from '@angular/core';
import {OrderItemService} from '../services/order-item/order-item.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.sass']
})
export class StockComponent implements OnInit {

  private step: number = 5;

  @Input()
  private subject: BehaviorSubject<number>;

  constructor(private orderItemService: OrderItemService) { }

  ngOnInit() {

    this.subject.subscribe((index) => {
      if (this.step === index) {
        this.orderItemService.findStock().subscribe(res => {
          console.log(res);
        })
      }
    });
  }

}
