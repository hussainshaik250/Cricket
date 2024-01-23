import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { sidebarItems, Strings } from '../../../../utilities/utilities';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  activeTab: string=Strings.teams;
  booleanVariableUsername$ = this.data.booleanVariableUsername$;
  booleanVariablePassword$ = this.data.booleanVariablePassword$;
  booleanVariableRegistered$ = this.data.booleanVariableRegistered$;
  sidebarItems=sidebarItems
  // tab: any;



  constructor(private data:DataService,private route:ActivatedRoute,private router:Router){

  }

  ngOnInit(): void {
    this.booleanVariableUsername$.subscribe((value) => {
      
    });
    this.booleanVariablePassword$.subscribe((value) => {
      
    });
    this.booleanVariableRegistered$.subscribe((value) => {
      
    });
    
  }








  setActiveTab(tab: string): void {
    
    this.data.setBooleanVariableUsername(false);
    this.data.setBooleanVariablePassword(false);
    this.data.setBooleanVariableRegistered(false);

    this.activeTab = tab;
    let routePath: string;
    switch (tab) {
      case 'Teams':
        routePath = '/Teams';
        break;
      case 'Players':
        routePath = '/Players';
        break;
      case 'Leagues':
        routePath = '/Leagues';
        break;
      
      default:
        // Handle other cases if needed
        routePath = '/dashbaord';
        break;
    }
    this.router.navigate([routePath]);
    
  }

}
