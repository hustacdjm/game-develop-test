import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreComponentServiceClient {
          
  component_api_key="eyJhbGciOiJIUzI1NiJ9.eyJvd25lciI6Imh1c3RhY2RqbUBnbWFpbC5jb20iLCJyb2xlIjoic2VsZiIsIm93bmVyTmFtZSI6IkxURHJlYW0gUHJvMiIsImV4cCI6MTc0MzMxMzY1Niwib3BlcmF0b3JOYW1lIjoiTFREcmVhbSBQcm8yIiwiaWF0IjoxNzQzMzEwMDU2LCJvcGVyYXRvciI6Imh1c3RhY2RqbUBnbWFpbC5jb20ifQ.-V1edZvkk95Zq2nAQixzjBoggXuPW5yrkhRcXZMRbMs";
  
  constructor(
  public sanitizer:DomSanitizer,
  public _httpClient: HttpClient
  ){}

  public Score(data, scoreId, env): Observable<any>{

      let headers = new HttpHeaders({
          'Content-Type': 'application/json',  // Example header
          'Authorization':'Bearer ' + env.Authorized
        });

        if(!env.Authorized){            
          headers = new HttpHeaders({
              'Content-Type': 'application/json',  // Example header
              'component-api-key': this.component_api_key
            });            
        }

        const SCORE_URL:string = env.ScoreUrl;

      return this._httpClient.post<any>(
          SCORE_URL+"/"+scoreId,
          data,
          { headers: headers }
          );
  }


}


