import {Component, Input, OnInit} from '@angular/core';
import {OrderItemService} from '../services/order-item/order-item.service';
import {BehaviorSubject} from 'rxjs';
import {TreeNode} from '../dto/tree-node';
import {NbDialogService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {ProductItemDTO} from '../dto/product-item-dto';
import {StateManagerService} from '../services/state-manager.service';
import {ProductService} from '../services/product/product.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.sass']
})
export class StockComponent implements OnInit {

  private data: TreeNode<ProductItemDTO>[];
  private productItemData: ProductItemDTO[] = [];
  private amount: number;

  defaultColumns = ['id', 'product', 'quantity', 'x', 'y', 'z', 'state'];
  allColumns = [...this.defaultColumns];
  dataSource: NbTreeGridDataSource<ProductItemDTO>;

  private step: number = 5;

  @Input()
  private subject: BehaviorSubject<number>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<ProductItemDTO>,
              private productService: ProductService,
              private dialogService: NbDialogService,
              private orderItemService: OrderItemService) { }

  ngOnInit() {
    this.subject.subscribe((index) => {
      if (this.step === index) {
        this.init();
      }
    });

    this.init();
  }

  init() {
    this.orderItemService.findStock().subscribe(res => {
      this.productItemData = res;
      this.data = res.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
      this.amount = this.getAmount();
    });
  }

  initData() {
    this.data = this.productItemData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  getAmount(): number {
    return this.productItemData.reduce((acc, curr) => acc + curr.quantity, 0);
  }

}
