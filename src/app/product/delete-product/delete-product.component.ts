import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { NbDialogRef } from '@nebular/theme';
import { equals } from 'src/app/directives/equals-validator';
import { ProductDTO } from 'src/app/dto/procuct-dto';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.sass']
})
export class DeleteProductComponent implements OnInit {

  private deleteProductForm: FormGroup;
  private product: ProductDTO;

  constructor(private fb: FormBuilder, 
    private productService: ProductService, 
    private toasterService: ToasterService, 
    private dialogRef: NbDialogRef<DeleteProductComponent>) { }

  ngOnInit() {
    this.deleteProductForm = this.fb.group({
      confirm: ['', [Validators.required, equals(new RegExp(this.product.name))]]
    })
  }

  submit(){
    this.productService.delete(this.product.id).subscribe(() => {
      this.toasterService.showSuccess('Producto eliminado exitosamente', 'Operación Exitosa');
      this.dialogRef.close(this.product.id);
    }, () => {
      this.toasterService.showError('No se pudo eliminar el producto', 'Error');
      this.close();
    })
  }

  close() {
    this.dialogRef.close();
  }

}
