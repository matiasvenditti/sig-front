import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Senasa } from 'src/app/model/senasa';
import { SenasaComponent } from '../senasa.component';
import { ProductMock } from 'src/app/model/product-mock';
import { SenasaService } from 'src/app/services/senasa/senasa.service';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-create-senasa',
  templateUrl: './create-senasa.component.html',
  styleUrls: ['./create-senasa.component.scss']
})
export class CreateSenasaComponent implements OnInit {
  
  private senasaForm: FormGroup;
  private countries: string[];

  private products: ProductMock[] = [
    new ProductMock(1, 'Product 1', 'Grams'),
    new ProductMock(2, 'Product 2', 'Tons'),
    new ProductMock(3, 'Product 1', 'Liters'),
  ];

  constructor(private fb: FormBuilder, private senasaService: SenasaService, private dialogRef: NbDialogRef, private toasterService: ToasterService) { }

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
  }

  submit() {
    this.senasaService.create(this.senasaForm.value).subscribe(res => {
      this.toasterService.showSuccess('Documento creado exitosamente','Operación exitosa');
      this.close();
    }, () => {
      this.toasterService.showError('No se pudo crear el documento correctamente', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
