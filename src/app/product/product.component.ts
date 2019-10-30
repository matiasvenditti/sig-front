import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '../dto/procuct-dto';
import { ProductService } from '../services/product/product.service';
import { NbTreeGridDataSourceBuilder, NbDialogService, NbTreeGridDataSource } from '@nebular/theme';
import { TreeNode } from '../dto/tree-node';
import { CreateProductComponent } from './create-product/create-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  private data: TreeNode<ProductDTO>[];

  customColumn = 'action';
  defaultColumns = ['id', 'name', 'unit'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<ProductDTO>;

  private productData: ProductDTO[] = [];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<ProductDTO>, private dialogService: NbDialogService, private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAll().subscribe(response => {
      this.productData = response;
      this.data = response.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    })
  }

  open() {
    this.dialogService.open(CreateProductComponent).onClose.subscribe((product: ProductDTO) => {
      if(product) {
        this.productData.push(product);
        this.initData();
      }
    });
  }

  delete(product: ProductDTO) {
    this.dialogService.open(DeleteProductComponent, {context: {product: product} as Partial<any>})
    .onClose.subscribe((deletedId: number) => {
      if(deletedId) {
        this.productData = this.productData.filter(product => product.id !== deletedId);
        this.initData();
      }
    });
  }

  initData() {
    this.data = this.productData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

}
