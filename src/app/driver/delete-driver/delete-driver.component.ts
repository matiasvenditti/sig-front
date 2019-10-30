import { Component, OnInit } from '@angular/core';
import { DriverDTO } from 'src/app/dto/driver-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DriverService } from 'src/app/services/driver/driver.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { NbDialogRef } from '@nebular/theme';
import { equals } from 'src/app/directives/equals-validator';

@Component({
  selector: 'app-delete-driver',
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.sass']
})
export class DeleteDriverComponent implements OnInit {

  private driver: DriverDTO;
  private deleteDriverForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private driverService: DriverService, 
    private toasterService: ToasterService, 
    private dialogRef: NbDialogRef<DeleteDriverComponent>) { }

  ngOnInit() {
    this.deleteDriverForm = this.fb.group({
      confirm: ['', [Validators.required, equals(new RegExp(this.driver.firstName))]]
    })
  }

  submit(){
    this.driverService.delete(this.driver.id).subscribe(() => {
      this.toasterService.showSuccess('Conductor eliminado exitosamente', 'Operación Exitosa');
      this.dialogRef.close(this.driver.id);
    }, () => {
      this.toasterService.showError('No se pudo eliminar al conductor', 'Error');
      this.close();
    })
  }

  close() {
    this.dialogRef.close();
  }

}
