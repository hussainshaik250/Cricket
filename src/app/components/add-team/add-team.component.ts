import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { DataService } from '../../shared/data.service';
import { Buttons, Strings, addPlayer } from '../../../../utilities/utilities';
import { addTeam } from '../../../../utilities/utilities';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.css',
})
export class AddTeamComponent {
  formGroup!: FormGroup;
  @Input() formData: any;
  docId!: string;
  editMode: boolean = false;
  errorMessage: string = '';
  addTeam=addTeam;
  addPlayer=addPlayer;
  actions=Buttons
  
  

  constructor(
    private _formBuilder: FormBuilder,
    private data: DataService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public fetchedData: any,
    private firestore: AngularFirestore,
    private router:Router
  ) {}

  ngOnInit(): void {
    // Initialize the form with or without data
    this.initializeForm();
  }

  initializeForm(): void {
    this.formGroup = this._formBuilder.group({
      teamName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      teamCode: ['', Validators.required],
      teamColor: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)],
      ],
    });

    // If data is provided, populate the form
    if (this.fetchedData && this.fetchedData.team) {
      this.editMode = true;
      // this.fetchedData.team.duedate=new Date()
      this.formGroup.patchValue(this.fetchedData.team);
      this.firestore
        .collection(Strings.teams, (ref) =>
          ref
            .where(Strings.teamName, '==', this.fetchedData.team.teamName)
            .where(Strings.teamCode, '==', this.fetchedData.team.teamCode)
        )
        .snapshotChanges()
        .pipe(map((actions) => actions.map((a) => a.payload.doc.id)))
        .subscribe((docIds) => {
          if (docIds.length > 0) {
            this.docId = docIds[0];
          }
        });
    }
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.formGroup.get(controlName);
    return !!(
      control &&
      control.hasError(errorType) &&
      (control.dirty || control.touched)
    );
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const { teamName, teamCode, teamColor } = this.formGroup.value;

      // Check if a team with the given name, code, or color already exists
      this.data
        .checkIfTeamExists('teamName', teamName)
        .subscribe((existingTeams) => {
          if (this.fetchedData && this.fetchedData.team) {
            // Update mode
            if (
              existingTeams.length > 1 ||
              (existingTeams.length === 1 &&
                existingTeams[0].id !== this.fetchedData.team.id)
            ) {
              console.error('Team with this name already exists!');
              this.errorMessage = 'Team with this name already exists!';
            } else {
              this.data.updateTeamData(this.docId, this.formGroup.value);
              this.dialog.closeAll();
            }
          } else {
            // Add mode
            if (existingTeams.length > 0) {
              this.errorMessage = 'Team with this name already exists!';
            } else {
              // No existing team with the same name, proceed to check teamCode and teamColor
              this.data
                .checkIfTeamExists('teamCode', teamCode)
                .subscribe((existingTeamsByCode) => {
                  if (existingTeamsByCode.length > 0) {
                    this.errorMessage = 'Team with this code already exists!';
                  } else {
                    // Team with the given code does not exist, proceed to check teamColor
                    this.data
                      .checkIfTeamExists('teamColor', teamColor)
                      .subscribe((existingTeamsByColor) => {
                        if (existingTeamsByColor.length > 0) {
                          this.errorMessage =
                            'Team with this color already exists!';
                        } else {
                          // Team with the given properties does not exist, add the new team
                          this.data.addTeamDataToFirestore(
                            this.formGroup.value
                          );
                          this.dialog.closeAll();
                        }
                      });
                  }
                });
            }
          }
        });
    } else {
      this.errorMessage = 'input fields are required!';
    }
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialog.closeAll();
    this.router.navigate(["Teams"]);
    
  }
}
