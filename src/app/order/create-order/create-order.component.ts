import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { NbDialogRef } from '@nebular/theme';
import { ToasterService } from 'src/app/services/toaster.service';
import { ProductDTO } from 'src/app/dto/procuct-dto';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.sass']
})
export class CreateOrderComponent implements OnInit {

  private orderForm: FormGroup;
  private products: ProductDTO[] = [];
  private min: Date;

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: NbDialogRef<CreateOrderComponent>,
    private toasterService: ToasterService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.min = new Date();
    
    this.orderForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(0)]],
      product: [null, Validators.required],
      createdDate: [null, Validators.required]
    });

    this.productService.getAll().subscribe(res => {
      this.products = res;
    })
  }

  submit() {
    this.orderService.create(this.orderForm.value).subscribe(res => {
      this.toasterService.showSuccess('Orden generada exitosamente','Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo generar la orden correctamente', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

  get(name: string) {
    return this.orderForm.get(name);
  }

}
