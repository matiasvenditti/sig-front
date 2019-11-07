import {Component, Input, OnInit} from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { OrderDTO } from '../dto/order-dto';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbDialogService } from '@nebular/theme';
import { TreeNode } from '../dto/tree-node';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { OrderState } from '../model/order-state';
import { StateManagerService } from '../services/state-manager.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.sass']
})
export class ReceptionComponent implements OnInit {

  @Input()
  private subject: BehaviorSubject<any>;

  private data: TreeNode<OrderDTO>[];
  private orderData: OrderDTO[] = [];

  customColumn = 'ingresar';
  defaultColumns = ['id', 'createdDate', 'supplier', 'state'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<OrderDTO>;

  private step: number = 1;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<OrderDTO>,
    private orderService: OrderService,
    private dialogService: NbDialogService,
    private stateManagerService: StateManagerService) { }

  ngOnInit() {
    this.subject.subscribe((index) => {
      if (this.step === index) {
        this.init();
      }
    });
    this.init();
  }

  init() {
    this.orderService.getAll().subscribe(res => {
      this.orderData = res;
      this.data = res.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    });
  }

  enter(order: OrderDTO) {
    order.state = OrderState.PLANT;
    this.orderService.update(order.id, order).subscribe((res: OrderDTO) => {
      const index = this.orderData.findIndex(find => find.id === order.id);
      if (index !== -1) {
        this.orderData[index] = res;
      }

    });
  }

  open(order: OrderDTO) {
    this.dialogService.open(OrderModalComponent, {context: {order: order} as Partial<any>}).onClose.subscribe((order: OrderDTO) => {
      if(order) {
        const index = this.orderData.findIndex(find => find.id === order.id);
        if (index !== -1) {
          this.orderData[index] = order;
          this.initData();
        }
      }
    });
  }

  initData() {
    this.data = this.orderData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  inFirstStep(state: string) {
    return this.stateManagerService.inFirstStep(state);
  }
}
