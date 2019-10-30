import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/services/toaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.sass']
})
export class CreateProductComponent implements OnInit {

  private units: string[];
  private productForm: FormGroup;

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: NbDialogRef<CreateProductComponent>,
    private toasterService: ToasterService) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      unit: ['', Validators.required]
    });

    this.units = [
      'Gramos',
      'Kilogramos',
      'Litros',
      'Toneladas'
    ];
  }

  submit() {
    this.productService.create(this.productForm.value).subscribe(res => {
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
