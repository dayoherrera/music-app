import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class AppService{

  constructor(private httpClient: HttpClient) { }

  getAlbum():Observable<any> {
    const httpOptions = {
    }; 
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/albums`,  httpOptions);
  }

  getPhotos():Observable<any> {
    const httpOptions = {
    }; 
    return this.httpClient.get<any>(`https://jsonplaceholder.typicode.com/photos`,  httpOptions);
  }

  getComments():Observable<any> {
    const httpOptions = {
    }; 
    return this.httpClient.get<any>(`https://jsonplaceholder.typicode.com/comments`,  httpOptions);
  }

  getUsers():Observable<any> {
    const httpOptions = {
    }; 
    return this.httpClient.get<any>(`https://jsonplaceholder.typicode.com/users`,  httpOptions);
  }

}
