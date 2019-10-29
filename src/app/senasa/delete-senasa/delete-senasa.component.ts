import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Senasa } from 'src/app/model/senasa';
import { equals } from '../../directives/equals-validator';
import { SenasaService } from 'src/app/services/senasa/senasa.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-delete-senasa',
  templateUrl: './delete-senasa.component.html',
  styleUrls: ['./delete-senasa.component.sass']
})
export class DeleteSenasaComponent implements OnInit {

  private senasa: Senasa;
  private deleteSenasaForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private senasaService: SenasaService, 
    private toasterService: ToasterService, 
    private dialogRef: NbDialogRef<DeleteSenasaComponent>) { }

  ngOnInit() {
    this.deleteSenasaForm = this.fb.group({
      confirm: ['', [Validators.required, equals(new RegExp(this.senasa.businessName))]]
    })
  }

  submit(){
    this.senasaService.delete(this.senasa.id).subscribe((_) => {
      this.toasterService.showSuccess('Documento eliminado exitosamente', 'Operación Exitosa');
      this.dialogRef.close(this.senasa.id);
    }, () => {
      this.toasterService.showError('No se pudo eliminar el documento', 'Error');
      this.close();
    })
  }

  close() {
    this.dialogRef.close();
  }

}
