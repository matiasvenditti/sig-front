import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ToasterService } from 'src/app/services/toaster.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.sass']
})
export class CreateSupplierComponent implements OnInit {

  private supplierForm: FormGroup;

  constructor(private fb: FormBuilder,
    private dialogRef: NbDialogRef<CreateSupplierComponent>,
    private toasterService: ToasterService,
    private supplierService: SupplierService) { }

  ngOnInit() {
    
    this.supplierForm = this.fb.group({
      name: [null, Validators.required],
      cuit: [null, Validators.required],
      businessName: [null, Validators.required]
    });
  }

  submit() {
    this.supplierService.create(this.supplierForm.value).subscribe(res => {
      this.toasterService.showSuccess('Proveedor generado exitosamente','Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo generar el proveedor correctamente', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
