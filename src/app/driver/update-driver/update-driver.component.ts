import { Component, OnInit } from '@angular/core';
import { DriverDTO } from 'src/app/dto/driver-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ToasterService } from 'src/app/services/toaster.service';
import { greaterThanToday } from 'src/app/directives/greater-date-validator';
import { DriverService } from 'src/app/services/driver/driver.service';

@Component({
  selector: 'app-update-driver',
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.sass']
})
export class UpdateDriverComponent implements OnInit {

  private driverForm: FormGroup;
  private driver: DriverDTO;
  private min: Date;

  constructor(private fb: FormBuilder,
    private driverService: DriverService,
    private dialogRef: NbDialogRef<UpdateDriverComponent>,
    private toasterService: ToasterService) { }

  ngOnInit() {
    this.min = new Date();
    this.driverForm = this.fb.group({
      firstName: [this.driver.firstName, Validators.required],
      lastName: [this.driver.lastName, Validators.required],
      dni: [this.driver.dni, Validators.required],
      licenseExpirationDate: [null, Validators.required]
    });
  }

  submit() {
    this.driverService.update(this.driver.id, this.driverForm.value).subscribe(res => {
      this.toasterService.showSuccess('Conductor modificado exitosamente','Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo modificar el conductor correctamente', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
