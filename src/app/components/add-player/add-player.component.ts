import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { DataService } from '../../shared/data.service';
import { Strings } from '../../../../utilities/utilities';
import { addPlayer } from '../../../../utilities/utilities';
import { Buttons } from '../../../../utilities/utilities';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css',
})
export class AddPlayerComponent implements OnInit {
  formGroup!: FormGroup;
  @Input() formData: any;
  docId!: string;
  editMode: boolean = false;
  addPlayer=addPlayer
  actions=Buttons
  // @Inject(MAT_DIALOG_DATA) public player: any;

  constructor(
    private _formBuilder: FormBuilder,
    private data: DataService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public player: any,
    private firestore: AngularFirestore,
    private router:Router
  ) {}

  ngOnInit(): void {
    // Initialize the form with or without data
    this.initializeForm();
    
  }

  initializeForm(): void {
    this.formGroup = this._formBuilder.group({
      playerName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)],
      ],
      jerseyNumber: ['', Validators.required],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      role: ['', Validators.required],
      style: ['', Validators.required],
    });
    if (this.player && this.player.playerData) {
      this.editMode = true;

      const { playerName, jerseyNumber, country, role, style } =
        this.player.playerData;

      this.formGroup.patchValue({
        playerName: playerName || '',
        jerseyNumber: jerseyNumber || '',
        country: country || '',
        role: role || '',
        style: style || '',
      });

      // If you're trying to get the document ID of the fetched player data
      this.firestore
        .collection(Strings.players, (ref) =>
          ref
            .where(Strings.playerName, '==', playerName)
            .where(Strings.jerseyNumber, '==', jerseyNumber)
        )
        .snapshotChanges()
        .pipe(map((actions) => actions.map((a) => a.payload.doc.id)))
        .subscribe((docIds) => {
          if (docIds.length > 0) {
            this.docId = docIds[0];
          }
        });
    }
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.formGroup.get(controlName);
    return !!(
      control &&
      control.hasError(errorType) &&
      (control.dirty || control.touched)
    );
  }


  onSubmit(): void {
    if (this.formGroup.valid) {
      // Call the service - update data
      if (this.player && this.player.playerData) {
        this.data.updatePlayerData(this.docId, this.formGroup.value);
      } else {
        // Add mode
        // Call the service method to add data
        this.data.addPlayerDataToFirestore(this.formGroup.value);
        
      }

      // Close the dialog
     
    }
    this.closeDialog()

  }

  closeDialog(): void {

    this.dialog.closeAll();
    this.router.navigate(["Players"]);
    
  }
}
