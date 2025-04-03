import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, switchMap } from 'rxjs';
import { LearningComponentDialog } from './learning-component-dialog/learning-component.dialog';

@Injectable({
  providedIn: 'root'
})
export class GameComponentServiceClient {
  
  env:any;
  component_api_key="eyJhbGciOiJIUzI1NiJ9.eyJvd25lciI6Imh1c3RhY2RqbUBnbWFpbC5jb20iLCJyb2xlIjoic2VsZiIsIm93bmVyTmFtZSI6IkxURHJlYW0gUHJvMiIsImV4cCI6MTc0MzMxMzY1Niwib3BlcmF0b3JOYW1lIjoiTFREcmVhbSBQcm8yIiwiaWF0IjoxNzQzMzEwMDU2LCJvcGVyYXRvciI6Imh1c3RhY2RqbUBnbWFpbC5jb20ifQ.-V1edZvkk95Zq2nAQixzjBoggXuPW5yrkhRcXZMRbMs";
  

  constructor(
  public sanitizer:DomSanitizer,
  public dialog: MatDialog,
  public _httpClient: HttpClient
  ){}

  public Score(data, scoreId): Observable<any>{

      let headers = new HttpHeaders({
          'Content-Type': 'application/json',  // Example header
          'Authorization':'Bearer ' + this.env.Authorized
        });

        if(!this.env.Authorized){            
          headers = new HttpHeaders({
              'Content-Type': 'application/json',  // Example header
              'component-api-key': this.component_api_key
            });            
        }

        const SCORE_URL:string = this.env.ScoreUrl;

      return this._httpClient.post<any>(
          SCORE_URL+"/"+scoreId,
          data,
          { headers: headers }
          );
  }

  public gameData(): Observable<any>{

    let headers = new HttpHeaders({
        'Content-Type': 'application/json',  // Example header
        'Authorization':'Bearer ' + this.env.Authorized
      });

      if(!this.env.Authorized){            
        headers = new HttpHeaders({
            'Content-Type': 'application/json',  // Example header
            'component-api-key': this.component_api_key
          });            
      }

      const GAME_DATA_URL:string = this.env.GameDataUrl;

    return this._httpClient.get<any>(
      GAME_DATA_URL,
        { headers: headers }
        );
}

openDialog(): Observable<any> {
  return this.gameData().pipe(
    switchMap(d => {
      console.log(d);
      const dialogRef = this.dialog.open(this.env.GameLearning, { data: d[0] });
      return dialogRef.afterClosed();
    })
  );
}
}


