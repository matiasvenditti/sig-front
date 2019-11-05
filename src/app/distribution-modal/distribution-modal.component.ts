import { Component, OnInit } from '@angular/core';
import { ProductItemDTO } from '../dto/product-item-dto';
import { NbDialogRef, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { ToasterService } from '../services/toaster.service';
import { SenasaService } from '../services/senasa/senasa.service';
import { Senasa } from '../model/senasa';
import { TreeNode } from '../dto/tree-node';
import { OrderItemService } from '../services/order-item/order-item.service';
import { OrderItemState } from '../model/order-item-state';

@Component({
  selector: 'app-distribution-modal',
  templateUrl: './distribution-modal.component.html',
  styleUrls: ['./distribution-modal.component.sass']
})
export class DistributionModalComponent implements OnInit {

  private productItem: ProductItemDTO;
  private senasa: Senasa;

  private senasaData: Senasa[] = [];

  defaultColumns = ['id', 'reviewRequired', 'businessName', 'country', 'createdDate'];
  allColumns = [...this.defaultColumns];
  dataSource: NbTreeGridDataSource<Senasa>;

  private data: TreeNode<Senasa>[];

  constructor(private dialogRef: NbDialogRef<DistributionModalComponent>,
              private toasterService: ToasterService,
              private senasaService: SenasaService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<Senasa>,
              private orderItemService: OrderItemService) {}

  ngOnInit() {
    this.senasaService.getByProduct(this.productItem.product.id).subscribe(res => {
      this.senasa = res;
      this.senasaData = [res];
      this.data = this.senasaData.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    });
  }

  submit() {
    // const remito: RemitoDTO = {...this.orderForm.value, items: this.createProducts};
    // this.orderService.validateDocumentation(this.order.id, remito).subscribe(res => {
    //   this.toasterService.showSuccess('Documentación validada exitosamente', 'Operación Exitosa');
    //   this.dialogRef.close(res);
    // }, () => {
    //   this.toasterService.showError('No se pudo validar la documentación para la orden', 'Error');
    //   this.close();
    // });
  }

  quality() {
    this.productItem.state = OrderItemState.QUALITY;
    this.orderItemService.setState(this.productItem).subscribe(res => {
      this.toasterService.showSuccess('Producto enviado a control de calidad exitosamente', 'Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo enviar a calidad el producto', 'Error');
      this.close();
    })
  }

  stock() {
    this.productItem.state = OrderItemState.STOCK;
    this.orderItemService.setState(this.productItem).subscribe(res => {
      this.toasterService.showSuccess('Producto enviado a almacenaje exitosamente', 'Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo enviar a almacenaje el producto', 'Error');
      this.close();
    })
  }

  close() {
    this.dialogRef.close();
  }

}
