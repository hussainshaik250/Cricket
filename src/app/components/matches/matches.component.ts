import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMatchComponent } from '../add-match/add-match.component';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent implements OnInit {

  constructor(private dialog:MatDialog){

  }



  ngOnInit(): void {
    
  }
  addMatch() {
    const dialogRef = this.dialog.open(AddMatchComponent, {
      width: '800px',
      height: '680px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      // Handle any data passed back from the dialog if needed
    });
  }

}
