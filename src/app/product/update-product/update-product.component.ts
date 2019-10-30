import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { NbDialogRef } from '@nebular/theme';
import { ToasterService } from 'src/app/services/toaster.service';
import { ProductDTO } from 'src/app/dto/procuct-dto';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.sass']
})
export class UpdateProductComponent implements OnInit {

  private units: string[];
  private product: ProductDTO;
  private productForm: FormGroup;

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: NbDialogRef<UpdateProductComponent>,
    private toasterService: ToasterService) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: [this.product.name, Validators.required],
      unit: [this.product.unit, Validators.required]
    });

    this.units = [
      'Gramos',
      'Kilogramos',
      'Litros',
      'Toneladas'
    ];
  }

  submit() {
    this.productService.update(this.product.id, this.productForm.value).subscribe(res => {
      this.toasterService.showSuccess('Producto modificado exitosamente','Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo modificar el producto correctamente', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

  get(name: string) {
    return this.productForm.get(name);
  }

}
