import { Component, OnInit } from '@angular/core';
import { ProductItemDTO } from '../dto/product-item-dto';
import { NbTreeGridDataSourceBuilder, NbDialogService, NbTreeGridDataSource } from '@nebular/theme';
import { ProductService } from '../services/product/product.service';
import { TreeNode } from '../dto/tree-node';
import { OrderItemService } from '../services/order-item/order-item.service';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.sass']
})
export class QualityComponent implements OnInit {

  private data: TreeNode<ProductItemDTO>[];
  private productItemData: ProductItemDTO[] = [];

  customColumn = 'state';
  defaultColumns = ['id', 'product', 'quantity'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<ProductItemDTO>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<ProductItemDTO>,
    private productService: ProductService,
    private dialogService: NbDialogService,
    private orderItemService: OrderItemService) { }

  ngOnInit() {
    this.orderItemService.findValid().subscribe(res => {
      console.log(res);
      this.productItemData = res;
      this.data = res.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    })
  }

  initData() {
    this.data = this.productItemData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

}
