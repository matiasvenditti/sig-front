import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SenasaService } from 'src/app/services/senasa/senasa.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { NbDialogRef } from '@nebular/theme';
import { SenasaDTO } from 'src/app/dto/senasa-dto';
import { ProductMock } from 'src/app/model/product-mock';

@Component({
  selector: 'app-update-senasa',
  templateUrl: './update-senasa.component.html',
  styleUrls: ['./update-senasa.component.sass']
})
export class UpdateSenasaComponent implements OnInit {

  private senasaForm: FormGroup;
  private countries: string[];
  private products: ProductMock[] = [];

  private min: Date;

  private senasa: SenasaDTO;

  constructor(
    private fb: FormBuilder, 
    private senasaService: SenasaService, 
    private dialogRef: NbDialogRef<UpdateSenasaComponent>, 
    private toasterService: ToasterService, 
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.min = new Date();

    this.senasaForm = this.fb.group({
      denomination: [this.senasa.denomination, Validators.required],
      businessName: [this.senasa.businessName, Validators.required],
      certification: [this.senasa.certification, Validators.required],
      country: [this.senasa.country, Validators.required],
      expirationDate: [null, Validators.required],
      // componentes: ['', Validators.required],
      product: [this.senasa.product, Validators.required]
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
    this.senasaService.update(this.senasa.id, this.senasaForm.value).subscribe(res => {
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
