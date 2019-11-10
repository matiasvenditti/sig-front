import { Component, OnInit } from '@angular/core';
import {TreeNode} from '../dto/tree-node';
import {NbDialogRef, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {SenasaService} from '../services/senasa/senasa.service';
import {ToasterService} from '../services/toaster.service';
import {ProductItemDTO} from '../dto/product-item-dto';
import {OrderItemState} from '../model/order-item-state';
import {OrderItemService} from '../services/order-item/order-item.service';
import {DistributionModalComponent} from '../distribution-modal/distribution-modal.component';

@Component({
  selector: 'app-non-conformity-modal',
  templateUrl: './non-conformity-modal.component.html',
  styleUrls: ['./non-conformity-modal.component.sass']
})
export class NonConformityModalComponent implements OnInit {

  private productItem: ProductItemDTO;
  private productItemData: ProductItemDTO[];

  defaultColumns = ['id', 'x', 'y', 'z', 'quantity'];
  allColumns = [...this.defaultColumns];
  dataSource: NbTreeGridDataSource<ProductItemDTO>;

  private data: TreeNode<ProductItemDTO>[];

  constructor(private dialogRef: NbDialogRef<NonConformityModalComponent>,
              private toasterService: ToasterService,
              private senasaService: SenasaService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<ProductItemDTO>,
              private orderItemService: OrderItemService) {}

  ngOnInit() {

    this.productItemData = [this.productItem];
    this.data = this.productItemData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  nonConformity() {
    this.productItem.state = OrderItemState.NONCONFORMITY;
    this.orderItemService.distribute(this.productItem, OrderItemState.NONCONFORMITY).subscribe(res => {
      this.toasterService.showSuccess('Producto enviado a no conformidad de calidad exitosamente', 'Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo enviar a no conformidad de calidad el producto', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
