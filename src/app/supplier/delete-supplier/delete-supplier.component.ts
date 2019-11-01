import { Component, OnInit } from '@angular/core';
import { SupplierDTO } from 'src/app/dto/suppliet-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { NbDialogRef } from '@nebular/theme';
import { equals } from 'src/app/directives/equals-validator';

@Component({
  selector: 'app-delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.sass']
})
export class DeleteSupplierComponent implements OnInit {

  private supplier: SupplierDTO;
  private deleteSupplierForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private supplierService: SupplierService, 
    private toasterService: ToasterService, 
    private dialogRef: NbDialogRef<DeleteSupplierComponent>) { }

  ngOnInit() {
    this.deleteSupplierForm = this.fb.group({
      confirm: ['', [Validators.required, equals(new RegExp(this.supplier.name))]]
    })
  }

  submit(){
    this.supplierService.delete(this.supplier.id).subscribe(() => {
      this.toasterService.showSuccess('Proveedor eliminado exitosamente', 'Operación Exitosa');
      this.dialogRef.close(this.supplier.id);
    }, () => {
      this.toasterService.showError('No se pudo eliminar al proveedor', 'Error');
      this.close();
    })
  }

  close() {
    this.dialogRef.close();
  }

}
