import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { RegisteredPlayersComponent } from './components/registered-players/registered-players.component';
import { UsernameComponent } from './components/username/username.component';
import { PasswordComponent } from './components/password/password.component';
import { LeagueComponent } from './components/league/league.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AddLeagueComponent } from './components/add-league/add-league.component';

const routes: Routes = [
 

  { path: 'login', component: LoginComponent },
  // { path: ':param', component: DashboardComponent }, 
  { path: 'register', component: RegisterComponent },
  // {path:'Teams/add-team',component:DashboardComponent},
  // {path:'Players/add-player',component:DashboardComponent},
  
  { 
    path: ':param', 
    component: DashboardComponent,
    children: [
      { path: 'add-team', component: AddTeamComponent },
      { path: 'add-player', component: AddPlayerComponent },
      { path: 'add-league', component: AddLeagueComponent },
      // Add other child routes as needed
    ]
  },
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  
  


  

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
