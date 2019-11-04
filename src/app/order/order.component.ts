import { Component, OnInit } from '@angular/core';
import { OrderDTO } from '../dto/order-dto';
import { NbTreeGridDataSourceBuilder, NbDialogService, NbTreeGridDataSource } from '@nebular/theme';
import { ProductService } from '../services/product/product.service';
import { TreeNode } from '../dto/tree-node';
import { OrderService } from '../services/order/order.service';
import { ProductDTO } from '../dto/procuct-dto';
import { CreateOrderComponent } from './create-order/create-order.component';
import { DeleteOrderComponent } from './delete-order/delete-order.component';
import { UpdateOrderComponent } from './update-order/update-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  private data: TreeNode<OrderDTO>[];

  customColumn = 'action';
  defaultColumns = ['id', 'createdDate', 'price'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<OrderDTO>;

  private products: ProductDTO[] = [];

  private orderData: OrderDTO[] = [];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<OrderDTO>,
    private dialogService: NbDialogService,
    private orderService: OrderService,
    private productService: ProductService) { }

  ngOnInit() {
    this.orderService.getAll().subscribe(response => {
      console.log(response);
      this.orderData = response;
      this.data = response.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    });

    this.productService.getAll().subscribe(res => {
      this.products = res;
    })
  }

  open() {
    this.dialogService.open(CreateOrderComponent).onClose.subscribe((order: OrderDTO) => {
      if(order) {
        this.orderData.push(order);
        this.initData();
      }
    });
  }

  delete(order: OrderDTO) {
    this.dialogService.open(DeleteOrderComponent, {context: {order: order} as Partial<any>})
    .onClose.subscribe((deletedId: number) => {
      if(deletedId) {
        this.orderData = this.orderData.filter(order => order.id !== deletedId);
        this.initData();
      }
    });
  }

  update(order: OrderDTO) {
    this.dialogService.open(UpdateOrderComponent, {context: {order: order} as Partial<any>})
    .onClose.subscribe((update: OrderDTO) => {
      if(update) {
        const index: number = this.orderData.findIndex(order => order.id === update.id);
        this.orderData[index] = update;
        this.initData();
      }
    })
  }


  initData() {
    this.data = this.orderData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

}
