import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';
import {OrderDTO} from '../dto/order-dto';
import {ClaimDTO} from '../dto/claim-dto';
import {NoDocumentationModalComponent} from '../no-documentation-modal/no-documentation-modal.component';
import {ToasterService} from '../services/toaster.service';
import {ClaimService} from '../services/claim/claim.service';
import {ClaimType} from '../model/claim-type';
import {ProductItemDTO} from '../dto/product-item-dto';
import {DeleteProductComponent} from '../product/delete-product/delete-product.component';
import {equals} from '../directives/equals-validator';
import {OrderItemService} from '../services/order-item/order-item.service';

@Component({
  selector: 'app-no-quality-modal',
  templateUrl: './no-quality-modal.component.html',
  styleUrls: ['./no-quality-modal.component.sass']
})
export class NoQualityModalComponent implements OnInit {

  private deleteClaimForm: FormGroup;
  private productItem: ProductItemDTO;

  constructor(private fb: FormBuilder,
              private productItemService: OrderItemService,
              private toasterService: ToasterService,
              private dialogRef: NbDialogRef<DeleteProductComponent>) { }

  ngOnInit() {
    this.deleteClaimForm = this.fb.group({
      confirm: ['', [Validators.required, equals(new RegExp(this.productItem.product.name))]]
    })
  }

  submit(){
    this.productItemService.remove(this.productItem.id).subscribe(() => {
      this.toasterService.showSuccess('NC Calidad eliminada exitosamente', 'Operación Exitosa');
      this.dialogRef.close(this.productItem.id);
    }, () => {
      this.toasterService.showError('No se pudo eliminar la NC', 'Error');
      this.close();
    })
  }

  close() {
    this.dialogRef.close();
  }

}
