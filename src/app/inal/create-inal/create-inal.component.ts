import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InalService } from 'src/app/services/inal/inal.service';
import { NbDialogRef } from '@nebular/theme';
import { ToasterService } from 'src/app/services/toaster.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductDTO } from 'src/app/dto/procuct-dto';
import { greaterThanToday } from 'src/app/directives/greater-date-validator';

@Component({
  selector: 'app-create-inal',
  templateUrl: './create-inal.component.html',
  styleUrls: ['./create-inal.component.sass']
})
export class CreateInalComponent implements OnInit {

  private inalForm: FormGroup;

  private products: ProductDTO[];

  constructor(private fb: FormBuilder, 
    private inalService: InalService, 
    private dialogRef: NbDialogRef<CreateInalComponent>, 
    private toasterService: ToasterService,
    private productService: ProductService) { }

  ngOnInit() {
    this.inalForm = this.fb.group({
      denomination: ['', Validators.required],
      rnpa: [null, Validators.required],
      batch: [null, [Validators.required, Validators.min(0), Validators.max(500)]],
      businessName: ['', Validators.required],
      expirationDate: [null, [Validators.required, greaterThanToday(new Date())]],
      product: [null, Validators.required]
    });

    this.productService.getAll().subscribe(res => {
      this.products = res;
    });
  }

  submit() {
    this.inalService.create(this.inalForm.value).subscribe(res => {
      this.toasterService.showSuccess('Documento creado exitosamente','Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo crear el documento correctamente', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
