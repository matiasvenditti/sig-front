import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TruckDTO } from 'src/app/dto/truck-dto';
import { TruckService } from 'src/app/services/truck/truck.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { NbDialogRef } from '@nebular/theme';
import { DeleteDriverComponent } from 'src/app/driver/delete-driver/delete-driver.component';
import { equals } from 'src/app/directives/equals-validator';

@Component({
  selector: 'app-delete-truck',
  templateUrl: './delete-truck.component.html',
  styleUrls: ['./delete-truck.component.sass']
})
export class DeleteTruckComponent implements OnInit {

  private deleteProductForm: FormGroup;
  private truck: TruckDTO;

  constructor(private fb: FormBuilder, 
    private truckService: TruckService, 
    private toasterService: ToasterService, 
    private dialogRef: NbDialogRef<DeleteDriverComponent>) { }

  ngOnInit() {
    this.deleteProductForm = this.fb.group({
      confirm: ['', [Validators.required, equals(new RegExp(this.truck.enrollment))]]
    })
  }

  submit(){
    this.truckService.delete(this.truck.id).subscribe(() => {
      this.toasterService.showSuccess('Camión eliminado exitosamente', 'Operación Exitosa');
      this.dialogRef.close(this.truck.id);
    }, () => {
      this.toasterService.showError('No se pudo eliminar el camión', 'Error');
      this.close();
    })
  }

  close() {
    this.dialogRef.close();
  }

}
