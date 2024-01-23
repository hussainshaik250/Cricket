import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CapitalizePipe } from './capitalize.file';
import { UsernameComponent } from './components/username/username.component';
import { PasswordComponent } from './components/password/password.component';
import { TeamsComponent } from './components/teams/teams.component';
import { PlayersComponent } from './components/players/players.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource ,MatTableModule} from '@angular/material/table';
import { AddTeamComponent } from './components/add-team/add-team.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { RegisteredPlayersComponent } from './components/registered-players/registered-players.component';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { LeagueComponent } from './components/league/league.component';
import { AddLeagueComponent } from './components/add-league/add-league.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomDatePipe } from './timestamp.pipe';
import { DatePipe } from '@angular/common';
import { MatchesComponent } from './components/matches/matches.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ViewMatchesComponent } from './components/view-matches/view-matches.component';





 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HeaderComponent,
    CapitalizePipe,
    UsernameComponent,
    PasswordComponent,
    TeamsComponent,
    PlayersComponent,
    AddTeamComponent,
    AddPlayerComponent,
    RegisteredPlayersComponent,
    LeagueComponent,
    AddLeagueComponent,
    CustomDatePipe,
    MatchesComponent,
    AddMatchComponent,
    ViewMatchesComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"cricket-68fcb","appId":"1:966775283753:web:5c505cabd1424938617c38","storageBucket":"cricket-68fcb.appspot.com","apiKey":"AIzaSyC4TBPz-vVezcVG8xl3mKRKXaGgzroFo5s","authDomain":"cricket-68fcb.firebaseapp.com","messagingSenderId":"966775283753"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule
  ],
  providers: [DatePipe,CustomDatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
