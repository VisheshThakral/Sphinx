import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { slideInAnimation } from '../../helpers/animations';
import { AuthService } from 'src/app/services/auth.service';
import { SphinxService } from 'src/app/services/sphinx.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SphinxService],
  animations: [slideInAnimation],
})
export class SignupComponent {
  isOnFirstPage: boolean = true;

  fullName: string = '';
  userName: string = '';
  email: string = '';
  password: string = '';
  userImage;

  imageFormData: FormData;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sphinxService: SphinxService,
    private router: Router
  ) {}

  goToSecondPage() {
    this.isOnFirstPage = false;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => (this.userImage = e.target.result);
      reader.readAsDataURL(file);
      this.imageFormData = new FormData();
      this.imageFormData.append('userImage', file);
    }
  }

  onSubmit() {
    this.sphinxService
      .uploadUserImage(this.imageFormData)
      .subscribe((response) => {
        let userImage: string = '';
        userImage = response.imageName;
        const userData = {
          userName: this.userName,
          email: this.email,
          password: this.password,
          fullName: this.fullName,
          userImage,
        };
        this.authService.signUp(userData).subscribe(() => {
          this.router.navigate(['/']);
        });
      });
  }
}
