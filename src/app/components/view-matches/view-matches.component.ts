import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { CustomDatePipe } from '../../timestamp.pipe';

@Component({
  selector: 'app-view-matches',
  templateUrl: './view-matches.component.html',
  styleUrl: './view-matches.component.css'
})
export class ViewMatchesComponent implements OnInit {

  activeTab: string = 'liveTab';
  matchesList: any[] = [];  // Assuming your matches data array here


  constructor(private data:DataService,private customDatePipe: CustomDatePipe){}

  ngOnInit(): void {
    this.getMatchesList()
    
    
  }

  openTab(tabId: string): void {
    this.activeTab = tabId;
  }

  getMatchesList(): void {
    this.data.getMatchesData().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.matchesList = res.map(match => {
            // Convert timestamps using CustomDatePipe
            match.startDate = this.customDatePipe.transform(match.startDate);
            match.endDate = this.customDatePipe.transform(match.endDate);
            return match;
          });

          // Get the current date
          const currentDate = new Date();
          

          // Divide matches into past, present, and upcoming
          this.pastMatches = this.matchesList.filter(match => new Date(match.endDate) < currentDate);
          
          this.presentMatches = this.matchesList.filter(match =>
            new Date(match.startDate) <= currentDate && new Date(match.endDate) >= currentDate
          );
          
          this.upcomingMatches = this.matchesList.filter(match => new Date(match.startDate) > currentDate);
          
        }
      },
      error: (err) => {
        // Handle error
      },
    });
  }

  // Define arrays to store past, present, and upcoming matches
  pastMatches: any[] = [];
  presentMatches: any[] = [];
  upcomingMatches: any[] = [];
  
}
