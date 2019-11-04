import { Component, OnInit } from '@angular/core';
import { OrderDTO } from '../dto/order-dto';
import { TreeNode } from '../dto/tree-node';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbDialogService, NbDialogRef } from '@nebular/theme';
import { ProductItemDTO } from '../dto/product-item-dto';
import { OrderService } from '../services/order/order.service';
import { SupplierDTO } from '../dto/suppliet-dto';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.sass']
})
export class OrderModalComponent implements OnInit {

  private data: TreeNode<ProductItemDTO>[];
  private productItemData: ProductItemDTO[] = [];
  
  private supplierData: SupplierDTO[] = [];
  private supplierTree: TreeNode<SupplierDTO>[];

  private order: OrderDTO;

  defaultColumns = ['product', 'quantity'];
  allProductColumns = [...this.defaultColumns];
  productDataSource: NbTreeGridDataSource<ProductItemDTO>;

  defaultSupplierColumns = ['name', 'cuit', 'businessName'];
  allSupplierColumns = [...this.defaultSupplierColumns];
  supplierDataSource: NbTreeGridDataSource<SupplierDTO>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<ProductItemDTO>,
    private supplierSourceBuilder: NbTreeGridDataSourceBuilder<SupplierDTO>,
    private orderService: OrderService,
    private dialogService: NbDialogService,
    private toasterService: ToasterService,
    private dialogRef: NbDialogRef<OrderModalComponent>,) { }

  ngOnInit() {
    this.productItemData = this.order.items;
    this.data = this.order.items.map(elem => {return {data: elem}});
    this.productDataSource = this.dataSourceBuilder.create(this.data);

    this.supplierData = [this.order.supplier];
    this.supplierTree = [this.order.supplier].map(elem => {return {data: elem}});
    this.supplierDataSource = this.supplierSourceBuilder.create(this.supplierTree);
  }

  submit() {
    this.order.verified = true;
    this.orderService.update(this.order.id, this.order).subscribe(res => {
      this.toasterService.showSuccess('El camión ingresó a la planta','Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo dar permiso al camión para ingresar', 'Error');
      this.close();
    })
  }

  close() {
    this.dialogRef.close();
  }

}
