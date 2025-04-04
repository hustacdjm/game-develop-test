import {AfterViewInit, Component, Inject, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatRadioGroup, MatRadioModule} from '@angular/material/radio';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DomSanitizer } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ElementRef, OnInit, OnDestroy } from '@angular/core';
import Phaser from 'phaser';
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'learning-component-dialog',
  templateUrl: 'learning-component.dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, ReactiveFormsModule, CommonModule,],
})
export class LearningComponentDialog {


  constructor(
    public dialogRef: MatDialogRef<LearningComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
  }

  submit(){
    this.dialogRef.close({points: 3});
  }

}