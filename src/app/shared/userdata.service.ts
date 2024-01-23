import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Userdata } from '../model/userdata';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private afs:AngularFirestore) { }
  adduser(user : Userdata) {
    user.id = this.afs.createId();
    return this.afs.collection('/Users').add(user);
  }
}
