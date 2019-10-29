import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Senasa } from 'src/app/model/senasa';
import { SenasaComponent } from '../senasa.component';
import { ProductMock } from 'src/app/model/product-mock';
import { SenasaService } from 'src/app/services/senasa/senasa.service';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { ToasterService } from 'src/app/services/toaster.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-create-senasa',
  templateUrl: './create-senasa.component.html',
  styleUrls: ['./create-senasa.component.scss']
})
export class CreateSenasaComponent implements OnInit {
  
  private senasaForm: FormGroup;
  private countries: string[];

  private products: ProductMock[] = [];

  constructor(private fb: FormBuilder, 
    private senasaService: SenasaService, 
    private dialogRef: NbDialogRef<CreateSenasaComponent>, 
    private toasterService: ToasterService, 
    private productService: ProductService) { }

  ngOnInit() {
    this.senasaForm = this.fb.group({
      denomination: ['', Validators.required],
      businessName: ['', Validators.required],
      certification: [false, Validators.requiredTrue],
      country: ['', Validators.required],
      expirationDate: [null, Validators.required],
      // componentes: ['', Validators.required],
      product: [null, Validators.required]
    });

    this.countries = [
      'Argentina',
      'Bolivia',
      'Chile',
      'Paraguay',
      'Uruguay'
    ];

    this.productService.getAll().subscribe(res => {
      this.products = res;
    });
  }

  submit() {
    this.senasaService.create(this.senasaForm.value).subscribe(res => {
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
