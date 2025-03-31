import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ScoreComponentServiceClient } from '../score.component.client';

@Component({
    selector     : 'score-component',
    templateUrl  : './score.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatButtonModule, RouterLink, MatIconModule, MatButtonModule,
        MatIconModule,  CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatRadioModule],
})
export class ScoreComponentComponent
{

  @Input() data:any;
  @Input() env:any;
 /**
     * Constructor
     */
  constructor(
    public sanitizer:DomSanitizer,
    public scoreComponentServiceClient: ScoreComponentServiceClient
    ){}


  Score(){

    if(this.data.component.scores && this.data.comopnent.scores.length>0){

      const scoreId = this.data.component.scores[0];
      this.scoreComponentServiceClient.Score(this.data, scoreId).subscribe(
          scoreResponse=>{
              console.log(scoreResponse);
              this.data.runtime.score= scoreResponse.runtime.score;
          }
      )
    }

    
  }


}
