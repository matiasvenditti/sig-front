import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TruckService } from 'src/app/services/truck/truck.service';
import { NbDialogRef } from '@nebular/theme';
import { CreateDriverComponent } from 'src/app/driver/create-driver/create-driver.component';
import { ToasterService } from 'src/app/services/toaster.service';
import { DriverService } from 'src/app/services/driver/driver.service';
import { DriverDTO } from 'src/app/dto/driver-dto';

@Component({
  selector: 'app-create-truck',
  templateUrl: './create-truck.component.html',
  styleUrls: ['./create-truck.component.sass']
})
export class CreateTruckComponent implements OnInit {

  private truckForm: FormGroup;
  private drivers: DriverDTO[] = [];


  constructor(private fb: FormBuilder,
    private truckService: TruckService,
    private dialogRef: NbDialogRef<CreateDriverComponent>,
    private toasterService: ToasterService,
    private driverService: DriverService) { }

  ngOnInit() {
    this.truckForm = this.fb.group({
      brand: ['', Validators.required],
      enrollment: ['', Validators.required],
      model: ['', Validators.required],
      driver: [null, Validators.required]
    });

    this.driverService.getAll().subscribe(res => {
      this.drivers = res;
    })
  }

  submit() {
    this.truckService.create(this.truckForm.value).subscribe(res => {
      this.toasterService.showSuccess('Producto creado exitosamente','Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo crear el producto correctamente', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
