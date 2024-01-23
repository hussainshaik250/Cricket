import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { AuthService } from '../../shared/auth.service';
import { Alerts, Routes, Strings,passwordItems ,Buttons} from '../../../../utilities/utilities';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent implements OnInit{
  userPassword!: string;
  userEmail!: string;
  newPassword!: string;
  password1!: string;
  confirm_password: any;
  new_password: any;
  passwordVisible: boolean = false;
  isPasswordVisible: boolean=true;
  showPassword: boolean=false;
  errorMessage: string='';
  passwordItems=passwordItems;
  actions=Buttons

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore,
    private dialog: MatDialog,
    private router: Router,
    private data:DataService
  ) {}

  ngOnInit(): void {
    this.loggedUser();
  }

  loggedUser() {
    this.userPassword = this.auth.loggedPassword;
    this.userEmail = this.auth.loggedEmail;
  }
 
  updatePassword(password1: string) {
    if (this.password1 == this.userPassword) {
      if (this.confirm_password == this.new_password) {
        this.firestore
          .collection(Strings.usersCap, (ref) =>
            ref.where(Strings.email, '==', this.userEmail)
          )
          .get()
          .subscribe((snapshot) => {
            if (snapshot.size === 1) {
              const userData = snapshot.docs[0].data() as any;
              // Access additional user data and perform further actions if needed
              console.log(userData);

              // Update the user's address
              userData.password = this.new_password;

              // Get the reference to the specific document
              const userDocRef = snapshot.docs[0].ref;

              // Update the document in Firestore

              userDocRef
                .update(userData)
                .then(() => {
                 
                })
                .catch((error) => {
                 
                });
                this.close_Dialog()
            } else {
              
            }
    
          });
      } else {
        
        this.errorMessage=Alerts.passwordMatch
        
      }
    } else {
      
      this.errorMessage=Alerts.wrongCurrentPassword
    }
    
    


  }
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
  close_Dialog() {
    this.dialog.closeAll();
    this.router.navigate(["/Teams"]);
    this.data.setBooleanVariablePassword(false);

  }


}
