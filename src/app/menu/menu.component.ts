import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  private minStep: number = 1;
  private maxStep: number = 5;

  private form: FormGroup;

  private index: number = this.minStep;
  private subject: BehaviorSubject<number> = new BehaviorSubject<number>(this.index);


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required]
    });
  }

  next() {
    if (this.index < this.maxStep) {
      this.subject.next(++this.index);
    }
  }

  prev() {
    if (this.index > this.minStep) {
      this.subject.next(--this.index);
    }
  }
}
