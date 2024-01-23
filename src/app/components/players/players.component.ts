import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerComponent } from '../add-player/add-player.component';
import { Strings } from '../../../../utilities/utilities';
import { DataService } from '../../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrl: './players.component.css',
})
export class PlayersComponent implements OnInit {
  displayedColumns: string[] = [
    Strings.playerName,
    Strings.jerseyNumber,
    Strings.role,
    Strings.style,
    Strings.country,
    Strings.action,
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private firestore: AngularFirestore,
    private data: DataService,
    private dialog: MatDialog,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getPlayersList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPlayersList(): void {
    this.data.getPlayersData().subscribe({
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
  addPlayer() {
    
    const dialogRef = this.dialog.open(AddPlayerComponent, {
      width: '400px',
      height: '380px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any data passed back from the dialog if needed
    });
  }
  async deletePlayer(row: any): Promise<void> {
    if (window.confirm(Strings.deleteConfirm + row.playerName + ' ?')) {
      await this.data.deletePlayer(row);
    }
  }
  editPlayer(selectedPlayer: any) {
    const dialogRef = this.dialog.open(AddPlayerComponent, {
      width: '400px',
      height: '380px',
      data: { playerData: selectedPlayer },
    });

    console.log(selectedPlayer);

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any data passed back from the dialog if needed

      this.getPlayersList();
    });
  }
}
