import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angularMultiStepForms';
  step: any = 1;
  isSubmitted: boolean = false;

  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      userDetails: formBuilder.group({
        fname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }),
      additionalDetails: formBuilder.group({
        mobile: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
        address: ['', Validators.required],
        country: ['', Validators.required],
        gender: ['', Validators.required],
      }),
      feedback: formBuilder.group({
        comments: ['', [Validators.required, Validators.minLength(10)]],
      }),
    });
  }

  getUserDetails() {
    return this.myForm.get('userDetails') as FormGroup;
  }

  getAdditionalDetailsGroup() {
    return this.myForm.get('additionalDetails') as FormGroup;
  }

  btnNext() {
    const userDetailsGroup = this.myForm.get('userDetails') as FormGroup;
    const additionalDetailsGroup = this.myForm.get(
      'additionalDetails'
    ) as FormGroup;

    if (userDetailsGroup.invalid && this.step == 1) {
      return;
    }

    if (additionalDetailsGroup.invalid && this.step == 2) {
      return;
    }

    /* comentando essa linha e removendo a property bind do html e 
    fazenso o if abaixo é outra maneira que
    impede o botão avançar para uma tela em branco */

    if (this.step < 3) {
      this.step += 1;
    }
  }

  btnPrevious() {
    this.step -= 1;
  }

  formSubmit() {
    if (this.myForm.valid) {
      this.isSubmitted = true;
      console.log(this.myForm.value);
    }
  }
}
