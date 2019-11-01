import { Component, OnInit } from '@angular/core';
import { TreeNode } from '../dto/tree-node';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbDialogService } from '@nebular/theme';
import { SupplierDTO } from '../dto/suppliet-dto';
import { SupplierService } from '../services/supplier/supplier.service';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { DeleteSupplierComponent } from './delete-supplier/delete-supplier.component';
import { UpdateSupplierComponent } from './update-supplier/update-supplier.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.sass']
})
export class SupplierComponent implements OnInit {

  private data: TreeNode<SupplierDTO>[];

  customColumn = 'action';
  defaultColumns = ['id', 'name', 'cuit', 'businessName'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<SupplierDTO>;

  private supplierData: SupplierDTO[] = [];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<SupplierDTO>,
    private dialogService: NbDialogService,
    private supplierService: SupplierService) { }

  ngOnInit() {
    this.supplierService.getAll().subscribe(response => {
      this.supplierData = response;
      this.data = response.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    })
  }

  open() {
    this.dialogService.open(CreateSupplierComponent).onClose.subscribe((supplier: SupplierDTO) => {
      if(supplier) {
        this.supplierData.push(supplier);
        this.initData();
      }
    });
  }

  delete(supplier: SupplierDTO) {
    this.dialogService.open(DeleteSupplierComponent, {context: {supplier: supplier} as Partial<any>})
    .onClose.subscribe((deletedId: number) => {
      if(deletedId) {
        this.supplierData = this.supplierData.filter(product => product.id !== deletedId);
        this.initData();
      }
    });
  }

  update(supplier: SupplierDTO) {
    this.dialogService.open(UpdateSupplierComponent, {context: {supplier: supplier} as Partial<any>})
    .onClose.subscribe((update: SupplierDTO) => {
      if(update) {
        const index: number = this.supplierData.findIndex(product => product.id === update.id);
        this.supplierData[index] = update;
        this.initData();
      }
    })
  }

  initData() {
    this.data = this.supplierData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

}
