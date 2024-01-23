import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../shared/auth.service';
import { DataService } from '../../shared/data.service';
import { Strings , headerItems} from '../../../../utilities/utilities';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('menu') menuTrigger!: MatMenuTrigger;
  @ViewChild('changeUsernameSubMenu') changeUsernameSubMenu!: MatMenuTrigger;
  @ViewChild('forgotPasswordSubMenu') forgotPasswordSubMenu!: MatMenuTrigger;
  user: string | undefined;
  updatedUsername!: string;
  loggedId: any;
  userLetter: string | undefined;
  headerItems=headerItems

  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.loggedInId();
    this.userName(this.loggedId).subscribe(
      (result) => {
        this.user = result;
        this.userLetter = result?.charAt(0);
      },
      (error) => {}
    );
  }
  ngAfterViewInit(): void {
    // this.userLetter=this.user?.charAt(0)
  }

  loggedInId() {
    this.loggedId = this.auth.loggedId;
  }

  userName(userId: string): Observable<string | undefined> {
    return this.firestore
      .collection(Strings.usersCap, (ref) =>
        ref.where(Strings.id, '==', userId)
      )
      .valueChanges({ idField: Strings.id })
      .pipe(
        map((users: any[]) => {
          // Assuming 'username' is the field in the document that contains the username
          const user = users[0]; // Since the query is based on ID, there should be at most one user
          return user ? user.firstname : undefined;
        })
      );
  }

  onLogout() {
    this.auth.logout();
  }
  passwordChange() {
    // const dialogRef = this.dialog.open(PasswordComponent, {
    //   width: '400px', // Set the width of the dialog
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   // Handle any data passed back from the dialog if needed
    //   console.log('The dialog was closed');

    // });
    this.router.navigate(['/password-change']);
    this.data.setBooleanVariablePassword(true);
    this.data.setBooleanVariableUsername(false);
    
  }
  userInfo() {
    // const dialogRef = this.dialog.open(UsernameComponent, {
    //   width: '400px', // Set the width of the dialog

    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   // Handle any data passed back from the dialog if needed
    //   console.log('The dialog was closed');

    // });
    this.data.setBooleanVariableUsername(true);
    this.data.setBooleanVariablePassword(false);
    this.router.navigate(['/profile-details']);
  }
}
