import {Component, Input, OnInit} from '@angular/core';
import { ProductItemDTO } from '../dto/product-item-dto';
import { NbTreeGridDataSourceBuilder, NbDialogService, NbTreeGridDataSource } from '@nebular/theme';
import { ProductService } from '../services/product/product.service';
import { TreeNode } from '../dto/tree-node';
import { OrderItemService } from '../services/order-item/order-item.service';
import {BehaviorSubject} from 'rxjs';
import {StateManagerService} from '../services/state-manager.service';
import {SendStockModalComponent} from '../send-stock-modal/send-stock-modal.component';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.sass']
})
export class QualityComponent implements OnInit {

  private data: TreeNode<ProductItemDTO>[];
  private productItemData: ProductItemDTO[] = [];

  customColumn = 'action';
  defaultColumns = ['id', 'product', 'quantity', 'state'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<ProductItemDTO>;

  private step: number = 4;

  @Input()
  private subject: BehaviorSubject<number>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<ProductItemDTO>,
    private productService: ProductService,
    private dialogService: NbDialogService,
    private orderItemService: OrderItemService,
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
    this.orderItemService.findQuality().subscribe(res => {
      this.productItemData = res;
      this.data = res.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    });
  }

  initData() {
    this.data = this.productItemData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  inForthStep(state: string): boolean {
    return this.stateManagerService.inForthStep(state);
  }

  inFifthStep(state: string): boolean {
    return this.stateManagerService.inFifthStep(state);
  }

  open(productItem: ProductItemDTO) {
    this.dialogService.open(SendStockModalComponent, {context: {productItem} as Partial<any>}).onClose.subscribe(item => {
      if (item) {
        const index: number = this.productItemData.findIndex(pItem => pItem.id === item.id);
        this.productItemData[index] = item;
      }
    });
  }

}
