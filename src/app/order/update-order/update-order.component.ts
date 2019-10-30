import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { NbDialogRef } from '@nebular/theme';
import { ToasterService } from 'src/app/services/toaster.service';
import { ProductDTO } from 'src/app/dto/procuct-dto';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderDTO } from 'src/app/dto/order-dto';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.sass']
})
export class UpdateOrderComponent implements OnInit {

  private orderForm: FormGroup;
  private products: ProductDTO[] = [];
  private min: Date;
  private order: OrderDTO;

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: NbDialogRef<UpdateOrderComponent>,
    private toasterService: ToasterService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.min = new Date();
    
    this.orderForm = this.fb.group({
      amount: [this.order.amount, [Validators.required, Validators.min(0)]],
      price: [this.order.price, [Validators.required, Validators.min(0)]],
      product: [this.order.product, Validators.required],
      createdDate: [null, Validators.required]
    });

    this.productService.getAll().subscribe(res => {
      this.products = res;
    })
  }

  submit() {
    this.orderService.update(this.order.id, this.orderForm.value).subscribe(res => {
      this.toasterService.showSuccess('Orden modificada exitosamente','Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo modificar la orden correctamente', 'Error');
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
