import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddTeamComponent } from '../add-team/add-team.component';
import { Strings } from '../../../../utilities/utilities';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
})
export class TeamsComponent {
  displayedColumns: string[] = [
    Strings.teamName,
    Strings.teamCode,
    Strings.teamColor,
    Strings.action,
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
    this.getTeamsList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTeamsList(): void {
    this.data.getTeamsData().subscribe({
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

  addTeam() {
    this.router.navigateByUrl("add-team")
    const dialogRef = this.dialog.open(AddTeamComponent, {
      width: '400px',
      height: '380px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any data passed back from the dialog if needed
    });
  }

  editTeam(selectedTeam: any) {
    const dialogRef = this.dialog.open(AddTeamComponent, {
      width: '400px',
      height: '380px',
      data: { team: selectedTeam },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any data passed back from the dialog if needed

      this.getTeamsList();
    });
  }


  async deleteTeam(row: any): Promise<void> {
    if (window.confirm(Strings.deleteConfirm + row.teamName + ' ?')) {
      await this.data.deleteTeam(row);
    }
  }
  // async addTeamPlayer(row:any):Promise<void>{
  //   console.log(row.teamName)

  // }

  async addTeamPlayer(row: any): Promise<void> {
    const teamName = row.teamName.toLowerCase();
    this.data.setTeamName(teamName);
    // this.router.navigate(['/addPlayer'])

    this.data.setBooleanVariableRegistered(true);
    this.data.setBooleanVariableUsername(false);
    this.data.setBooleanVariablePassword(false);
  }
}
