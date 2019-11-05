import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RemitoDTO } from '../dto/remito-dto';
import { OrderDTO } from '../dto/order-dto';
import { ProductItemDTO } from '../dto/product-item-dto';
import { ProductService } from '../services/product/product.service';
import { SupplierService } from '../services/supplier/supplier.service';
import { OrderService } from '../services/order/order.service';
import { NbDialogRef } from '@nebular/theme';
import { ToasterService } from '../services/toaster.service';
import { ProductDTO } from '../dto/procuct-dto';
import { SupplierDTO } from '../dto/suppliet-dto';

@Component({
  selector: 'app-documentation-modal',
  templateUrl: './documentation-modal.component.html',
  styleUrls: ['./documentation-modal.component.sass']
})
export class DocumentationModalComponent implements OnInit {

  private orderForm: FormGroup;
  private products: ProductDTO[] = [];
  private suppliers: SupplierDTO[] = [];
  // private min: Date;
  private createProducts: ProductItemDTO[] = [];

  private productForm: FormGroup;

  private order: OrderDTO;

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private supplierServie: SupplierService,
              private orderService: OrderService,
              private dialogRef: NbDialogRef<DocumentationModalComponent>,
              private toasterService: ToasterService) {}

  ngOnInit() {
    // this.min = new Date();

    this.orderForm = this.fb.group({
      createdDate: [null, Validators.required],
      supplier: [null, Validators.required]
    });

    this.productForm = this.fb.group({
      product: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.min(0)]]
    });

    this.getProducts();
    this.getSuppliers();
  }

  submit() {
    const remito: RemitoDTO = {...this.orderForm.value, items: this.createProducts};
    this.orderService.validateDocumentation(this.order.id, remito).subscribe(res => {
      this.toasterService.showSuccess('Documentación validada exitosamente', 'Operación Exitosa');
      this.dialogRef.close(res);
    }, () => {
      this.toasterService.showError('No se pudo validar la documentación para la orden', 'Error');
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

  addToList() {
    const index = this.createProducts.findIndex((productItem: ProductItemDTO) => productItem.product.id === this.productForm.value.product.id);
    if (index === -1) {
      this.createProducts.push(this.productForm.value)
    } else {
      this.createProducts[index].quantity = this.productForm.value.quantity;
    }
    this.productForm.reset()
  }

  removeProductItem(productItem: ProductItemDTO) {
    this.createProducts = this.createProducts.filter((item: ProductItemDTO) => item.product.name !== productItem.product.name);
  }

}
