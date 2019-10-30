import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DriverService } from 'src/app/services/driver/driver.service';
import { NbDialogRef } from '@nebular/theme';
import { ToasterService } from 'src/app/services/toaster.service';
import { greaterThanToday } from 'src/app/directives/greater-date-validator';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.sass']
})
export class CreateDriverComponent implements OnInit {

  private driverForm: FormGroup;

  constructor(private fb: FormBuilder,
    private driverService: DriverService,
    private dialogRef: NbDialogRef<CreateDriverComponent>,
    private toasterService: ToasterService) { }

  ngOnInit() {
    this.driverForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: [null, Validators.required],
      licenseExpirationDate: [null, [Validators.required, greaterThanToday(new Date())]]
    });
  }

  submit() {
    this.driverService.create(this.driverForm.value).subscribe(res => {
      this.toasterService.showSuccess('Conductor creado exitosamente','Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo crear el conductor correctamente', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
