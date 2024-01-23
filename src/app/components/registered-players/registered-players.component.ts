import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Player } from '../../model/player';
import { DataService } from '../../shared/data.service';


@Component({
  selector: 'app-registered-players',
  templateUrl: './registered-players.component.html',
  styleUrl: './registered-players.component.css',
})
export class RegisteredPlayersComponent implements OnInit {
  // players!: any[];

  displayedColumns: string[] = ['playerName', 'jerseyNumber', 'role', 'style'];
  dataSource!: MatTableDataSource<Player>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  teamName: string = '';
  isChecked = false;
  players: any[] = [];
  selectedPlayers: any[] = [];
  selectedPlayersDataSource: MatTableDataSource<any> =
    new MatTableDataSource<any>();
  errorMessage: string = '';
  maxSelectionReached: boolean = false;

  constructor(
    private dataService: DataService,
    private firestore: AngularFirestore,
    private data:DataService,
  ) {}
  ngOnInit(): void {
    this.dataService.teamName$.subscribe((teamName) => {
      const playersCollection = this.firestore.collection('Players');
      this.teamName = teamName;

      playersCollection.ref
        .where('country', '==', teamName)
        .get()
        .then((querySnapshot) => {
          const players: any[] = [];
          querySnapshot.forEach((doc) => {
            players.push(doc.data());
          });
          // Log the players array
          this.dataSource = new MatTableDataSource(players);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
        .catch((error) => {
          console.error('Error getting players:', error);
        });
    });
    this.errorMessage;
  }

  onSelectionChange(): void {
    const maxSelections = 11;

    // Check if the selectedPlayers array exceeds the maximum limit
    if (this.selectedPlayers.length > maxSelections) {
      this.maxSelectionReached = true;
      this.errorMessage =
        'Maximum selections reached. Cannot select more than 11 players!';

      this.selectedPlayers.pop();
    } else {
      // Clear the flag if the selection is within the limit
      this.maxSelectionReached = false;
    }

    // Update the selectedPlayersDataSource when the selection changes
    this.selectedPlayersDataSource.data = this.selectedPlayers;
  }
  onSave(){
    this.data.savePlayerNames(this.selectedPlayers.map(item => item.playerName),this.teamName)
  }
 
}
