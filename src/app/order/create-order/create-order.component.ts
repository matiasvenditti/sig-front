import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { NbDialogRef } from '@nebular/theme';
import { ToasterService } from 'src/app/services/toaster.service';
import { ProductDTO } from 'src/app/dto/procuct-dto';
import { OrderService } from 'src/app/services/order/order.service';
import {SupplierService} from '../../services/supplier/supplier.service';
import {SupplierDTO} from '../../dto/suppliet-dto';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.sass']
})
export class CreateOrderComponent implements OnInit {

  private orderForm: FormGroup;
  private products: ProductDTO[] = [];
  private suppliers: SupplierDTO[] = [];
  private min: Date;

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private supplierServie: SupplierService,
              private orderService: OrderService,
              private dialogRef: NbDialogRef<CreateOrderComponent>,
              private toasterService: ToasterService) {}

  ngOnInit() {
    this.min = new Date();

    this.orderForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(0)]],
      product: [null, Validators.required],
      createdDate: [null, Validators.required],
      supplier: [null, Validators.required]
    });

    this.getProducts();
    this.getSuppliers();
  }

  submit() {
    this.orderService.create(this.orderForm.value).subscribe(res => {
      this.toasterService.showSuccess('Orden generada exitosamente', 'Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo generar la orden correctamente', 'Error');
      this.close();
    });
  }

  private getProducts() {
    this.productService.getAll().subscribe(products => {
      this.products = products;
    });
  }

  private getSuppliers() {
    this.supplierServie.getAll().subscribe(suppliers => {
      this.suppliers = suppliers;
    });
  }

  close() {
    this.dialogRef.close();
  }

  get(name: string) {
    return this.orderForm.get(name);
  }

}
