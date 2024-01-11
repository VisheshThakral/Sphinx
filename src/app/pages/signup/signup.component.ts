import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SphinxService } from 'src/app/services/sphinx.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SphinxService]
})
export class SignupComponent {
  signupForm: FormGroup;
  selectedImage: any = 'https://loremflickr.com/640/480/abstract';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sphinxService: SphinxService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      userImage: ['', [Validators.required]],
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('userImage', file);
      this.sphinxService.uploadUserImage(formData).subscribe((response)=> {
        console.log(response)
      })
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signUp(this.signupForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      console.log('Form Invalid');
    }
  }
}
