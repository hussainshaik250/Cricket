import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Buttons, Strings, addPlayer } from '../../../../utilities/utilities';
import { DataService } from '../../shared/data.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-add-league',
  templateUrl: './add-league.component.html',
  styleUrl: './add-league.component.css'
})
export class AddLeagueComponent implements OnInit {
  
  formGroup!: FormGroup;
  @Input() formData: any;
  docId!: string;
  editMode: boolean = false;
  addPlayer=addPlayer
  actions=Buttons
  teamNames: string[] = [];
  teamNamesTeam2: string[]=[]
  selectedTeam1!: string
  playerNames1!: any[];
  playerNames2!: any[];
  

  constructor(
    private _formBuilder: FormBuilder,
    private data: DataService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public leagueData: any,
    private firestore: AngularFirestore,
    private router:Router
  ) {}

  ngOnInit(): void {
    // Initialize the form with or without data
    this.initializeForm();
    this.getTeamsList()
       
  }

  initializeForm(): void {
    this.formGroup = this._formBuilder.group({
      leagueName: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      // team1: [null, Validators.required],
      // team2: [null, Validators.required],
      // team1Players: [null, Validators.required],
      // team2Players: [null, Validators.required],
      
    });
    if (this.leagueData && this.leagueData.League) {
      this.editMode = true;

      
      this.formGroup.patchValue(this.leagueData.League);
      this.firestore
        .collection(Strings.leagues, (ref) =>
          ref
            .where(Strings.leagueName, '==', this.leagueData.league.leagueName)
            
        )
        .snapshotChanges()
        .pipe(map((actions) => actions.map((a) => a.payload.doc.id)))
        .subscribe((docIds) => {
          if (docIds.length > 0) {
            this.docId = docIds[0];
          }
        });
    }
    this.formGroup.get('team1')?.valueChanges.subscribe((selectedTeam) => {
      // Filter out the selected team from Team 1
      this.data.getSelectedListByCountry(selectedTeam.toLowerCase()).subscribe({
        next: (res) => {
          if (res && res.length > 0) {
            this.playerNames1 = res.map(player => player.playerName);
            
            
          }
        },
        error: (err) => {},
      });

      this.playerNames1=[]
      this.teamNamesTeam2 = this.teamNames.filter(team => team !== selectedTeam);
      this.formGroup.get('team2')?.valueChanges.subscribe((selectedTeam) => {
        // Filter out the selected team from Team 1
        this.data.getSelectedListByCountry(selectedTeam.toLowerCase()).subscribe({
          next: (res) => {
            if (res && res.length > 0) {
              this.playerNames2 = res.map(player => player.playerName);
              
              
            }
          },
          error: (err) => {},
        });
  
        this.playerNames2=[]
        
        
      });
      
    });
  
  }
  

  hasError(controlName: string, errorType: string): boolean {
    const control = this.formGroup.get(controlName);
    return !!(
      control &&
      control.hasError(errorType) &&
      (control.dirty || control.touched)
    );
  }
  
  

 
  

  getTeamsList(): void {
    this.data.getTeamsData().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.teamNames = res.map(team => team.teamName);
          
        }
      },
      error: (err) => {},
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      // Call the service - update data
      if (this.leagueData && this.leagueData.league) {
        this.data.updateLeagueData(this.docId, this.formGroup.value);
      } else {
        // Add mode
        // Call the service method to add data
        this.data.addLeagueDataToFirestore(this.formGroup.value);
        
      }

      // Close the dialog
     
    }
    this.closeDialog()

  }



  closeDialog(): void {

    this.dialog.closeAll();
    this.router.navigate(['/Leagues'])
    
    
  }

}
