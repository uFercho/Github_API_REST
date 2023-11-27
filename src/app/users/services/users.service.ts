import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';

import { environments } from 'src/environments/environments.prod';
import { Observable, catchError, of } from 'rxjs';
import { DataUser, UserProfile } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string = environments.apiurl;
  private apiKey: string = environments.apikey;

  constructor(
    private httpClient: HttpClient,
  ) { }

  getUsers( login:string, page: number = 1, per_page: number = 10 ): Observable<HttpEvent<DataUser>> {

    const path: string = 'search/users';

    const httpOptions: any = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/vnd.github+json')
        .set('Authorization', this.apiKey),
      params: new HttpParams ()
        .set('q', `${login} in:login`)
        .set('page', page)
        .set('per_page', per_page)
        .set('type', 'Users'),
      observe: "response"
    }

    return this.httpClient.get<DataUser>(`${this.apiUrl}/${path}`, httpOptions)
  }

  getUserById( login: string ): Observable<HttpEvent<UserProfile>> {

    const path: string = 'users';

    const httpOptions: any = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/vnd.github+json')
        .set('Authorization', this.apiKey),
      observe: "response"
    }

    return this.httpClient.get<UserProfile>(`${this.apiUrl}/${path}/${login}`, httpOptions)
  }

}
