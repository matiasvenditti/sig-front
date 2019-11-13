import { Component, OnInit } from '@angular/core';
import {NbDialogService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {OrderService} from '../services/order/order.service';
import {ClaimDTO} from '../dto/claim-dto';
import {DeleteClaimModalComponent} from '../delete-claim-modal/delete-claim-modal.component';
import {TreeNode} from '../dto/tree-node';
import {ClaimService} from '../services/claim/claim.service';
import {ToasterService} from '../services/toaster.service';
import {ProductItemDTO} from '../dto/product-item-dto';
import {OrderItemService} from '../services/order-item/order-item.service';
import {NoQualityModalComponent} from '../no-quality-modal/no-quality-modal.component';

@Component({
  selector: 'app-non-conformity-quality',
  templateUrl: './non-conformity-quality.component.html',
  styleUrls: ['./non-conformity-quality.component.sass']
})
export class NonConformityQualityComponent implements OnInit {

  private data: TreeNode<ProductItemDTO>[];
  private productItemData: ProductItemDTO[] = [];

  customColumn = 'eliminar';
  defaultColumns = ['id', 'product', 'quantity'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<ProductItemDTO>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<ProductItemDTO>,
              private orderService: OrderService,
              private productItemService: OrderItemService,
              private dialogService: NbDialogService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.productItemService.findNonConformity().subscribe(res => {
      console.log(res);
      this.productItemData = res;
      this.data = res.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    });

  }

  initData() {
    this.data = this.productItemData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  openDeleteModal(productItem: ProductItemDTO) {
    this.dialogService.open(NoQualityModalComponent, {context: {productItem: productItem}} as Partial<any>).onClose.subscribe((productItemId: number) => {
      if(productItemId) {
        this.productItemData = this.productItemData.filter(filter => filter.id !== productItemId);
        this.initData();
      }
    });
  }

}
