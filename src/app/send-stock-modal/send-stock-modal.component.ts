import { Component, OnInit } from '@angular/core';
import {TreeNode} from '../dto/tree-node';
import {NbDialogRef, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {SenasaService} from '../services/senasa/senasa.service';
import {ToasterService} from '../services/toaster.service';
import {DistributionModalComponent} from '../distribution-modal/distribution-modal.component';
import {ProductItemDTO} from '../dto/product-item-dto';
import {OrderItemState} from '../model/order-item-state';
import {OrderItemService} from '../services/order-item/order-item.service';
import {Senasa} from '../model/senasa';

@Component({
  selector: 'app-send-stock-modal',
  templateUrl: './send-stock-modal.component.html',
  styleUrls: ['./send-stock-modal.component.sass']
})
export class SendStockModalComponent implements OnInit {

  private productItem: ProductItemDTO;
  private productItemData: ProductItemDTO[];

  defaultColumns = ['id', 'x', 'y', 'z', 'quantity'];
  allColumns = [...this.defaultColumns];
  dataSource: NbTreeGridDataSource<ProductItemDTO>;

  private data: TreeNode<ProductItemDTO>[];

  constructor(private dialogRef: NbDialogRef<DistributionModalComponent>,
              private toasterService: ToasterService,
              private senasaService: SenasaService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<ProductItemDTO>,
              private orderItemService: OrderItemService) {}

  ngOnInit() {

    this.productItemData = [this.productItem];
    this.data = this.productItemData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  quality() {
    this.productItem.state = OrderItemState.QUALITY;
    this.orderItemService.distribute(this.productItem, OrderItemState.QUALITY).subscribe(res => {
      this.toasterService.showSuccess('Producto enviado a control de calidad exitosamente', 'Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo enviar a calidad el producto', 'Error');
      this.close();
    });
  }

  stock() {
    this.productItem.state = OrderItemState.STOCK;
    this.orderItemService.distribute(this.productItem, OrderItemState.STOCK).subscribe(res => {
      this.toasterService.showSuccess('Producto enviado a almacenaje exitosamente', 'Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo enviar a almacenaje el producto', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
