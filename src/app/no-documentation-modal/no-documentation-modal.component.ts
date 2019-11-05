import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderDTO } from '../dto/order-dto';
import { NbDialogRef } from '@nebular/theme';
import { ToasterService } from '../services/toaster.service';
import { OrderState } from '../model/order-state';
import { ClaimType } from '../model/claim-type';
import { ClaimDTO } from '../dto/claim-dto';
import { ClaimService } from '../services/claim/claim.service';

@Component({
  selector: 'app-no-documentation-modal',
  templateUrl: './no-documentation-modal.component.html',
  styleUrls: ['./no-documentation-modal.component.sass']
})
export class NoDocumentationModalComponent implements OnInit {

  private claimForm: FormGroup;

  private order: OrderDTO;
  private claimTypes: string[] = [ClaimType.DOCUMENTATION, ClaimType.QUALITY];

  constructor(private fb: FormBuilder,
              private dialogRef: NbDialogRef<NoDocumentationModalComponent>,
              private toasterService: ToasterService,
              private claimService: ClaimService) {}

  ngOnInit() {
    // this.min = new Date();

    this.claimForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      type: [null, Validators.required]
    });
  }

  submit() {
    const claim: ClaimDTO = {...this.claimForm.value, order: this.order};
    this.claimService.create(claim).subscribe(res => {
      this.toasterService.showSuccess('Reclamo de no conformidad para documentación generado', 'Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo crear el reclamo', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
