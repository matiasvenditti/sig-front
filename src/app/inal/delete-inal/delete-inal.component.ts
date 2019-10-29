import { Component, OnInit } from '@angular/core';
import { InalDTO } from 'src/app/dto/inal-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InalService } from 'src/app/services/inal/inal.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { NbDialogRef } from '@nebular/theme';
import { equals } from 'src/app/directives/equals-validator';

@Component({
  selector: 'app-delete-inal',
  templateUrl: './delete-inal.component.html',
  styleUrls: ['./delete-inal.component.sass']
})
export class DeleteInalComponent implements OnInit {

  private inal: InalDTO;
  private deleteInalForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private inalService: InalService, 
    private toasterService: ToasterService, 
    private dialogRef: NbDialogRef<DeleteInalComponent>) { }

  ngOnInit() {
    this.deleteInalForm = this.fb.group({
      confirm: ['', [Validators.required, equals(new RegExp(this.inal.businessName))]]
    })
  }

  submit(){
    this.inalService.delete(this.inal.id).subscribe(() => {
      this.toasterService.showSuccess('Documento eliminado exitosamente', 'Operación Exitosa');
      this.dialogRef.close(this.inal.id);
    }, () => {
      this.toasterService.showError('No se pudo eliminar el documento', 'Error');
      this.close();
    })
  }

  close() {
    this.dialogRef.close();
  }

}
