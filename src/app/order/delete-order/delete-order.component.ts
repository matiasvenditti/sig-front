import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order/order.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { NbDialogRef } from '@nebular/theme';
import { equals } from 'src/app/directives/equals-validator';
import { OrderDTO } from 'src/app/dto/order-dto';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.sass']
})
export class DeleteOrderComponent implements OnInit {

  private deleteOrderForm: FormGroup;
  private order: OrderDTO;

  constructor(private fb: FormBuilder, 
    private orderService: OrderService, 
    private toasterService: ToasterService, 
    private dialogRef: NbDialogRef<DeleteOrderComponent>) { }

  ngOnInit() {
    this.deleteOrderForm = this.fb.group({
      confirm: ['', [Validators.required, equals(new RegExp(this.order.id.toString()))]]
    })
  }

  submit(){
    this.orderService.delete(this.order.id).subscribe(() => {
      this.toasterService.showSuccess('Orden eliminada exitosamente', 'Operación Exitosa');
      this.dialogRef.close(this.order.id);
    }, () => {
      this.toasterService.showError('No se pudo eliminar la orden', 'Error');
      this.close();
    })
  }

  close() {
    this.dialogRef.close();
  }

}
