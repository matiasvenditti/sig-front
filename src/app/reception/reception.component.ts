import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { OrderDTO } from '../dto/order-dto';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbDialogService } from '@nebular/theme';
import { TreeNode } from '../dto/tree-node';
import { OrderModalComponent } from '../order-modal/order-modal.component';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.sass']
})
export class ReceptionComponent implements OnInit {

  private data: TreeNode<OrderDTO>[];
  private orderData: OrderDTO[] = [];

  customColumn = 'ingresar';
  defaultColumns = ['id', 'createdDate', 'supplier', 'verified'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<OrderDTO>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<OrderDTO>,
    private orderService: OrderService, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.orderService.getAll().subscribe(res => {
      this.orderData = res;
      this.data = res.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    });
  }

  enter(order: OrderDTO) {
    order.verified = true;
    console.log(order);
    this.orderService.update(order.id, order).subscribe((res: OrderDTO) => {
      const index = this.orderData.findIndex(find => find.id === order.id);
      if (index !== -1) {
        this.orderData[index] = res;
      }

    });
  }

  open(order: OrderDTO) {
    //TODO: Descomentar esto cuando se haga el back
    // order.items = [{product: {id: 1, name: "Product 1", unit: "Tons"}, amount: 100}, {product: {id: 2, name: "Product 2", unit: "Liters"}, amount: 100}];
    console.log(order);
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

}
