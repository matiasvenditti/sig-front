import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplierDTO } from 'src/app/dto/suppliet-dto';
import { NbDialogRef } from '@nebular/theme';
import { ToasterService } from 'src/app/services/toaster.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.sass']
})
export class UpdateSupplierComponent implements OnInit {
  
  private supplierForm: FormGroup;
  private supplier: SupplierDTO;

  constructor(private fb: FormBuilder,
    private dialogRef: NbDialogRef<UpdateSupplierComponent>,
    private toasterService: ToasterService,
    private supplierService: SupplierService) { }

  ngOnInit() {
    this.supplierForm = this.fb.group({
      name: [this.supplier.name, Validators.required],
      cuit: [this.supplier.cuit, Validators.required],
      businessName: [this.supplier.businessName, Validators.required]
    });
  }

  submit() {
    this.supplierService.update(this.supplier.id, this.supplierForm.value).subscribe(res => {
      this.toasterService.showSuccess('Proveedor modificado exitosamente','Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo modificar el proveedor correctamente', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
