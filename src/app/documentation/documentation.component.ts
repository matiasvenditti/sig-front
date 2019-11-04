import { Component, OnInit } from '@angular/core';
import { TreeNode } from '../dto/tree-node';
import { OrderDTO } from '../dto/order-dto';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbDialogService } from '@nebular/theme';
import { OrderService } from '../services/order/order.service';
import { DocumentationModalComponent } from '../documentation-modal/documentation-modal.component';
import { OrderState } from '../model/order-state';
import { StateManagerService } from '../services/state-manager.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.sass']
})
export class DocumentationComponent implements OnInit {

  private data: TreeNode<OrderDTO>[];
  private orderData: OrderDTO[] = [];

  customColumn = 'validar';
  defaultColumns = ['id', 'createdDate', 'supplier', 'state'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<OrderDTO>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<OrderDTO>,
    private orderService: OrderService,
    private dialogService: NbDialogService,
    private stateManagerService: StateManagerService) { }

  ngOnInit() {
    this.orderService.getAllPlant().subscribe(res => {
      this.orderData = res;
      this.data = res.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    });
  }

  enter(order: OrderDTO) {
    order.state = OrderState.QUALITY;
    this.orderService.update(order.id, order).subscribe((res: OrderDTO) => {
      const index = this.orderData.findIndex(find => find.id === order.id);
      if (index !== -1) {
        this.orderData[index] = res;
      }

    });
  }

  open(order: OrderDTO) {
    this.dialogService.open(DocumentationModalComponent, {context: {order: order} as Partial<any>}).onClose.subscribe((order: OrderDTO) => {
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

  inSecondStep(state: string) {
    return this.stateManagerService.inSecondStep(state);
  }
}
