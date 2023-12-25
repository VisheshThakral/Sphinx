import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      userImage: [
        'https://loremflickr.com/640/480/abstract',
        [Validators.required],
      ],
    });
  }

  onSubmit() {
    // Handle form submission
    if (this.signupForm.valid) {
      // Perform signup logic
      console.log('Form submitted:', this.signupForm.value);
    } else {
      // Display error messages or handle invalid form
    }
  }
}
