import { Component, OnInit } from '@angular/core';
import { ProductItemDTO } from '../dto/product-item-dto';
import { TreeNode } from '../dto/tree-node';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbDialogService } from '@nebular/theme';
import { ProductService } from '../services/product/product.service';
import { DistributionModalComponent } from '../distribution-modal/distribution-modal.component';
import { OrderItemService } from '../services/order-item/order-item.service';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.sass']
})
export class DistributionComponent implements OnInit {

  private data: TreeNode<ProductItemDTO>[];
  private productItemData: ProductItemDTO[] = [];

  customColumn = 'distribuir';
  defaultColumns = ['id', 'product', 'quantity', 'state'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<ProductItemDTO>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<ProductItemDTO>,
    private productService: ProductService,
    private dialogService: NbDialogService,
    private orderItemService: OrderItemService) { }

  ngOnInit() {
    this.orderItemService.findValid().subscribe(res => {
      this.productItemData = res;
      this.data = res.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    })
  }

  initData() {
    this.data = this.productItemData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  open(item: ProductItemDTO) {
    this.dialogService.open(DistributionModalComponent, {context: {productItem: item}} as Partial<any>).onClose.subscribe((productItem: ProductItemDTO) => {
      if(productItem) {
        const index = this.productItemData.findIndex(item => item.id === productItem.id);
        this.productItemData[index] = productItem;
        this.initData();
      }
    })
  }

}
