import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { UserdataService } from '../../shared/userdata.service';
import { Userdata } from '../../model/userdata';
import { Alerts, Strings } from '../../../../utilities/utilities';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 
  email : string = '';
  password : string = '';
  phonenumber:string='';
  firstname:string='';
  lastname:string='';
  id:string='';
  confirmPassword:string='';
  userObj: Userdata = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    phonenumber:'',
    password:'',
    
  };
  

  constructor(private auth : AuthService,private userlist:UserdataService) { }

 

  register() {

    if(this.email == '') {
      alert(Alerts.email);
      return;
    }

    if(this.password == '') {
      alert(Alerts.password);
      return;
    }
    if(this.password!=this.confirmPassword){
      alert(Alerts.passwordMatch)
      return;
    }
    

    this.auth.register(this.email,this.password);
    
    
    this.addUser();

  }
  isPasswordVisible: boolean = true;

  togglePasswordVisibility(password: HTMLInputElement): void {
    // Toggle between password and text
    password.type = password.type === 'password' ? 'text' : 'password';
  
    // Toggle between eye and eye-slash icons
    const eyeIcon = document.querySelector('.bi-eye');
    const eyeSlashIcon = document.querySelector('.bi-eye-slash');
  
    if (eyeIcon && eyeSlashIcon) {
      eyeIcon.classList.toggle('hidden');
      eyeSlashIcon.classList.toggle('hidden');
    }
  }
 

  addUser(){
 
    this.userObj.id = '';
    this.userObj.firstname = this.firstname;
    this.userObj.lastname = this.lastname;
    this.userObj.email = this.email;
    this.userObj.password = this.password;
    this.userObj.phonenumber = this.phonenumber;
    

    this.userlist.adduser(this.userObj);
    

  }

}
