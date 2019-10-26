import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-senasa',
  templateUrl: './create-senasa.component.html',
  styleUrls: ['./create-senasa.component.scss']
})
export class CreateSenasaComponent implements OnInit {
  
  private senasaForm: FormGroup;
  private countries: string[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.senasaForm = this.fb.group({
      denomination: ['', Validators.required],
      businessName: ['', Validators.required],
      country: ['', Validators.required],
      certification: [null, Validators.required],
      expirationDate: [null, Validators.required],
      // componentes: ['', Validators.required],
      producto: [null, Validators.required]
    });

    this.countries = [
      'Argentina',
      'Bolivia',
      'Chile',
      'Paraguay',
      'Uruguay'
    ];
  }

}
