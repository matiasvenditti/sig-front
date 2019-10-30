import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InalService } from 'src/app/services/inal/inal.service';
import { NbDialogRef } from '@nebular/theme';
import { ToasterService } from 'src/app/services/toaster.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductDTO } from 'src/app/dto/procuct-dto';
import { greaterThanToday } from 'src/app/directives/greater-date-validator';
import { InalDTO } from 'src/app/dto/inal-dto';

@Component({
  selector: 'app-update-inal',
  templateUrl: './update-inal.component.html',
  styleUrls: ['./update-inal.component.sass']
})
export class UpdateInalComponent implements OnInit {

  private inalForm: FormGroup;
  private inal: InalDTO;
  private min: Date;
  private products: ProductDTO[] = [];

  constructor(
    private fb: FormBuilder, 
    private inalService: InalService, 
    private dialogRef: NbDialogRef<UpdateInalComponent>, 
    private toasterService: ToasterService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.min = new Date();

    this.inalForm = this.fb.group({
      denomination: [this.inal.denomination, Validators.required],
      rnpa: [this.inal.rnpa, Validators.required],
      batch: [this.inal.batch, [Validators.required, Validators.min(0), Validators.max(500)]],
      businessName: [this.inal.businessName, Validators.required],
      expirationDate: [null, Validators.required],
      product: [null, Validators.required]
    });

    this.productService.getAll().subscribe(res => {
      this.products = res;
    });
  }

  submit() {
    this.inalService.update(this.inal.id, this.inalForm.value).subscribe(res => {
      this.toasterService.showSuccess('Documento modificado exitosamente','Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo modificar el documento correctamente', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
