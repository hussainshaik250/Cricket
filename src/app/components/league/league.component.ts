import { Component, ViewChild } from '@angular/core';
import { Strings } from '../../../../utilities/utilities';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from '../../shared/data.service';
import { Router } from '@angular/router';
import { AddTeamComponent } from '../add-team/add-team.component';
import { AddLeagueComponent } from '../add-league/add-league.component';
import { AddMatchComponent } from '../add-match/add-match.component';
import { ViewMatchesComponent } from '../view-matches/view-matches.component';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrl: './league.component.css'
})
export class LeagueComponent {
  displayedColumns: string[] = [
  'leagueName',
  'startDate',
  'endDate',
  // 'team1',
  // 'team1Players',
  // 'team2',
  // 'team2Players',
  
  'action',

];
dataSource!: MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
constructor(
  private firestore: AngularFirestore,
  private data: DataService,
  private dialog: MatDialog,
  private router: Router
) {}

ngOnInit(): void {
  this.getLeaguesList();
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

getLeaguesList(): void {
  this.data.getLeaguesData().subscribe({
    next: (res) => {
      if (res && res.length > 0) {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    },
    error: (err) => {},
  });
}

addLeague() {
  const dialogRef = this.dialog.open(AddLeagueComponent, {
    width: '400px',
    height: '380px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    // Handle any data passed back from the dialog if needed
  });
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

editLeague(selectedLeague: any) {
  const dialogRef = this.dialog.open(AddLeagueComponent, {
    width: '400px',
    height: '380px',
    data: { League: selectedLeague },
  });
 

  dialogRef.afterClosed().subscribe((result) => {
    // Handle any data passed back from the dialog if needed

    this.getLeaguesList();
  });
}
viewMatches(){
  const dialogRef = this.dialog.open(ViewMatchesComponent, {
    width: '800px',
    height: '680px',
    
  });
 

  dialogRef.afterClosed().subscribe((result) => {
    // Handle any data passed back from the dialog if needed

    this.getLeaguesList();
  });

}

async deleteLeague(row: any): Promise<void> {
  if (window.confirm(Strings.deleteConfirm + row.leagueName + ' ?')) {
    await this.data.deleteLeague(row);
    this.getLeaguesList()
  }
}
// async addTeamPlayer(row:any):Promise<void>{
//   console.log(row.teamName)

// }

async addTeamPlayer(row: any): Promise<void> {
  const teamName = row.teamName.toLowerCase();
  this.data.setTeamName(teamName);
  // this.router.navigate(['/addPlayer'])

  this.data.setBooleanVariableRegistered(false);
  this.data.setBooleanVariableUsername(false);
  this.data.setBooleanVariablePassword(false);
}
}
