import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrl: './add-match.component.css'
})
export class AddMatchComponent implements OnInit {
  leagues: string[] = [];
  formGroup!: FormGroup;
  teamNames: string[] = [];
  teamNamesTeam2: string[]=[]
  selectedTeam1!: string
  playerNames1!: any[];
  playerNames2!: any[];
  formats:string[]=["T20","ODI","TEST"]
  

  constructor(private data:DataService,private _formBuilder: FormBuilder,private dialog:MatDialog,private router:Router){

  }

  ngOnInit(): void {
    this.initializeForm();
    this.getLeaguesList();
    this.getTeamsList();

    
  }
  initializeForm(): void {
    this.formGroup = this._formBuilder.group({
      // league: [null, Validators.required],
      team1: [null, Validators.required],
      team2: [null, Validators.required],
      team1Players: [null, Validators.required],
      team2Players: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      format: [null, Validators.required],
      
      
    });
    // if (this.leagueData && this.leagueData.league) {
    //   this.editMode = true;

      
    //   this.formGroup.patchValue(this.leagueData.league);
    //   this.firestore
    //     .collection(Strings.leagues, (ref) =>
    //       ref
    //         .where(Strings.leagueName, '==', this.leagueData.league.leagueName)
            
    //     )
    //     .snapshotChanges()
    //     .pipe(map((actions) => actions.map((a) => a.payload.doc.id)))
    //     .subscribe((docIds) => {
    //       if (docIds.length > 0) {
    //         this.docId = docIds[0];
    //       }
    //     });
    // }
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

  getLeaguesList(): void {
    this.data.getLeaguesData().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.leagues = res.map(league => league.leagueName);
          
          
        }
      },
      error: (err) => {},
    });
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
     
      
        this.data.addMatchDataToFirestore(this.formGroup.value);
        this.closeDialog()
        
      }

      
     
    
    

  }

  closeDialog(): void {

    this.dialog.closeAll();
    // this.router.navigate(["dashboard/players"]);
    
  }

}
