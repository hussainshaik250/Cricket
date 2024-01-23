import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Alerts, Strings } from '../../../../utilities/utilities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage:string=''
  isPasswordVisible: boolean=true;
  loginStrings=Strings
  showPassword: boolean=false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  async login() {
    try {
      if (this.email === '') {
        throw new Error(Alerts.email);
      }
  
      if (this.password === '') {
        throw new Error(Alerts.password);
      }
  
      await this.auth.login(this.email, this.password);
  
      // Navigate or perform other actions on successful login
      this.email = '';
      this.password = '';
      this.errorMessage = ''; // Reset the error message on successful login
    } catch (error:any) {
      // Handle login error
      this.errorMessage = error.message || Alerts.wrongPassword;
      
    }
  }
  signInWithGoogle() {
    this.auth.googleSignIn();
  }
  // togglePasswordVisibility(passwordInput: any): void {
  //   this.showPassword = !this.showPassword;
  //   this.isPasswordVisible = !this.isPasswordVisible;
  //   passwordInput.type = this.isPasswordVisible ? Strings.text : Strings.password;
  // }
 
  togglePasswordVisibility(passwordInput: HTMLInputElement): void {
    // Toggle between password and text
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  
    // Toggle between eye and eye-slash icons
    const eyeIcon = document.querySelector('.bi-eye');
    const eyeSlashIcon = document.querySelector('.bi-eye-slash');
  
    if (eyeIcon && eyeSlashIcon) {
      eyeIcon.classList.toggle('hidden');
      eyeSlashIcon.classList.toggle('hidden');
    }
  }

}
