import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TruckService } from 'src/app/services/truck/truck.service';
import { NbDialogRef } from '@nebular/theme';
import { ToasterService } from 'src/app/services/toaster.service';
import { TruckDTO } from 'src/app/dto/truck-dto';
import { DriverDTO } from 'src/app/dto/driver-dto';
import { DriverService } from 'src/app/services/driver/driver.service';

@Component({
  selector: 'app-update-truck',
  templateUrl: './update-truck.component.html',
  styleUrls: ['./update-truck.component.sass']
})
export class UpdateTruckComponent implements OnInit {

  private truckForm: FormGroup;
  private drivers: DriverDTO[] = [];
  private truck: TruckDTO;

  constructor(private fb: FormBuilder,
    private truckService: TruckService,
    private dialogRef: NbDialogRef<UpdateTruckComponent>,
    private toasterService: ToasterService,
    private driverService: DriverService) { }

  ngOnInit() {
    this.truckForm = this.fb.group({
      brand: [this.truck.brand, Validators.required],
      enrollment: [this.truck.enrollment, Validators.required],
      model: [this.truck.model, Validators.required],
      driver: [null, Validators.required]
    });

    this.driverService.getAll().subscribe(res => {
      this.drivers = res;
    })
  }

  submit() {
    this.truckService.update(this.truck.id, this.truckForm.value).subscribe(res => {
      this.toasterService.showSuccess('Camión modificado exitosamente','Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo modificar el camión correctamente', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
