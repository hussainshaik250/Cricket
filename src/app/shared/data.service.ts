import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Strings } from '../../../utilities/utilities';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private booleanVariableUsername = new BehaviorSubject<boolean>(false);
  booleanVariableUsername$: Observable<boolean> =
    this.booleanVariableUsername.asObservable();
  private booleanVariablePassword = new BehaviorSubject<boolean>(false);
  booleanVariablePassword$: Observable<boolean> =
    this.booleanVariablePassword.asObservable();
  private teamNameSubject = new BehaviorSubject<string>('');
  teamName$: Observable<string> = this.teamNameSubject.asObservable();
  private booleanVariableRegistered = new BehaviorSubject<boolean>(false);
  booleanVariableRegistered$: Observable<boolean> =
    this.booleanVariableRegistered.asObservable();

  constructor(private firestore: AngularFirestore) {}

  setBooleanVariableUsername(value: boolean): void {
    this.booleanVariableUsername.next(value);
  }
  setBooleanVariablePassword(value: boolean): void {
    this.booleanVariablePassword.next(value);
  }
  setBooleanVariableRegistered(value: boolean): void {
    this.booleanVariableRegistered.next(value);
  }
  getTeamsData(): Observable<any[]> {
    return this.firestore.collection(Strings.teams).valueChanges();
  }
  
  getPlayersData(): Observable<any[]> {
    return this.firestore.collection(Strings.players).valueChanges();
  }
  private convertToDate(timestamp: any): Date {
    // Implement your conversion logic here
    // For example, you can use toDate() method for Firestore Timestamps
    return timestamp ? timestamp.toDate() : null;
  }
  
  getLeaguesData():Observable<any[]>{
    return this.firestore.collection(Strings.leagues).valueChanges()
  }
  getMatchesData():Observable<any[]>{
    return this.firestore.collection('Matches').valueChanges()
  }
  deleteTeam(row: any): Promise<void> {
    const docRef = this.firestore
      .collection(Strings.teams, (ref) =>
        ref
          .where(Strings.teamName, '==', row.teamName)
          .where(Strings.teamCode, '==', row.teamCode)
      )
      .get()
      .toPromise();

    return docRef.then((querySnapshot: any) => {
      if (querySnapshot.size > 0) {
        const docToDelete = querySnapshot.docs[0];
        return docToDelete.ref.delete();
      } else {
        throw new Error('Document not found');
      }
    });
  }

  updateTeamData(docId: string, updatedData: any): void {
    // Update the data in the "Teams" collection in Firestore
    this.firestore
      .collection(Strings.teams)
      .doc(docId)
      .update(updatedData)
      .then(() => {})
      .catch((error) => {});
  }
  addTeamDataToFirestore(dataToAdd: any) {
    // Add the data to the "Teams" collection in Firestore
    this.firestore
      .collection(Strings.teams)
      .add(dataToAdd)
      .then((docRef) => {})
      .catch((error) => {});
  }
  addMatchDataToFirestore(dataToAdd: any) {
    // Add the data to the "Teams" collection in Firestore
    this.firestore
      .collection('Matches')
      .add(dataToAdd)
      .then((docRef) => {})
      .catch((error) => {});
  }
  addPlayerDataToFirestore(dataToAdd: any) {
    // Add the data to the "Players" collection in Firestore
    this.firestore
      .collection(Strings.players)
      .add(dataToAdd)
      .then((docRef) => {})
      .catch((error) => {});
  }
  setTeamName(teamName: string): void {
    this.teamNameSubject.next(teamName.toLowerCase());
  }
  deletePlayer(row: any): Promise<void> {
    const docRef = this.firestore
      .collection(Strings.players, (ref) =>
        ref
          .where(Strings.playerName, '==', row.playerName)
          .where(Strings.jerseyNumber, '==', row.jerseyNumber)
      )
      .get()
      .toPromise();

    return docRef.then((querySnapshot: any) => {
      if (querySnapshot.size > 0) {
        const docToDelete = querySnapshot.docs[0];
        return docToDelete.ref.delete();
      } else {
        throw new Error('Document not found');
      }
    });
  }
  updatePlayerData(docId: string, updatedData: any): void {
    // Update the data in the "Teams" collection in Firestore
    this.firestore
      .collection(Strings.players)
      .doc(docId)
      .update(updatedData)
      .then(() => {})
      .catch((error) => {});
  }

  checkIfTeamExists(property: string, value: string): Observable<any[]> {
    return this.firestore
      .collection('Teams', (ref) => ref.where(property, '==', value))
      .valueChanges();
  }
  savePlayerNames(playerNames: string[], teamName: string): Promise<void[]> {
    const promises: Promise<void>[] = [];

    playerNames.forEach(playerName => {
      const playerDocRef = this.firestore.collection('selectedList').doc(); // Use the teamName as the collection name
      const playerData = { playerName, country: teamName };
      const promise = playerDocRef.set(playerData).then(() => {
        console.log(`Player ${playerName} saved in collection ${teamName}`);
      });

      promises.push(promise);
    });

    return Promise.all(promises);
  }
  getSelectedListByCountry(country: string): Observable<any[]> {
    return this.firestore.collection('selectedList', ref => ref.where('country', '==', country)).valueChanges();
  }

  addLeagueDataToFirestore(dataToAdd: any) {
    // Add the data to the "Players" collection in Firestore
    this.firestore
      .collection('/Leagues')
      .add(dataToAdd)
      .then((docRef) => {})
      .catch((error) => {});
  }
  updateLeagueData(docId: string, updatedData: any): void {
    // Update the data in the "Teams" collection in Firestore
    this.firestore
      .collection(Strings.leagues)
      .doc(docId)
      .update(updatedData)
      .then(() => {})
      .catch((error) => {});
  }
  deleteLeague(row: any): Promise<void> {
    const docRef = this.firestore
      .collection(Strings.leagues, (ref) =>
        ref
          .where(Strings.leagueName, '==', row.leagueName)
          
      )
      .get()
      .toPromise();

    return docRef.then((querySnapshot: any) => {
      if (querySnapshot.size > 0) {
        const docToDelete = querySnapshot.docs[0];
        return docToDelete.ref.delete();
      } else {
        throw new Error('Document not found');
      }
    });
  }
}
 

