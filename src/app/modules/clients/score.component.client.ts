import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreComponentServiceClient {
          
  component_api_key="component_api_key_value";
  
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


