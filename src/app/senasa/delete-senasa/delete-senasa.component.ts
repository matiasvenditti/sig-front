import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete-senasa',
  templateUrl: './delete-senasa.component.html',
  styleUrls: ['./delete-senasa.component.sass']
})
export class DeleteSenasaComponent implements OnInit {

  senasa: any;
  private deleteSenasaForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.deleteSenasaForm = this.fb.group({
      confirm: ['', Validators.required]
    })
  }

  submit(){
    console.log(this.deleteSenasaForm.value);
  }

}
