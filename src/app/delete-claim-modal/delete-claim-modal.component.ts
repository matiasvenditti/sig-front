import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../services/product/product.service';
import {NbDialogRef} from '@nebular/theme';
import {equals} from '../directives/equals-validator';
import {DeleteProductComponent} from '../product/delete-product/delete-product.component';
import {ProductDTO} from '../dto/procuct-dto';
import {ToasterService} from '../services/toaster.service';
import {ClaimDTO} from '../dto/claim-dto';
import {ClaimService} from '../services/claim/claim.service';

@Component({
  selector: 'app-delete-claim-modal',
  templateUrl: './delete-claim-modal.component.html',
  styleUrls: ['./delete-claim-modal.component.sass']
})
export class DeleteClaimModalComponent implements OnInit {

  private deleteClaimForm: FormGroup;
  private claim: ClaimDTO;

  constructor(private fb: FormBuilder,
              private claimService: ClaimService,
              private toasterService: ToasterService,
              private dialogRef: NbDialogRef<DeleteProductComponent>) { }

  ngOnInit() {
    this.deleteClaimForm = this.fb.group({
      confirm: ['', [Validators.required, equals(new RegExp(this.claim.title))]]
    })
  }

  submit(){
    this.claimService.delete(this.claim.id).subscribe(() => {
      this.toasterService.showSuccess('NC Documentación eliminada exitosamente', 'Operación Exitosa');
      this.dialogRef.close(this.claim.id);
    }, () => {
      this.toasterService.showError('No se pudo eliminar la NC', 'Error');
      this.close();
    })
  }

  close() {
    this.dialogRef.close();
  }

}
