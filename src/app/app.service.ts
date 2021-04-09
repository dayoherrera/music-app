import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class AppService{

  constructor(private httpClient: HttpClient) { }

  getAlbum():any {
    const httpOptions = {
    }; 
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/albums`,  httpOptions);
  }

  getPhotos():any {
    const httpOptions = {
    }; 
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/photos`,  httpOptions);
  }

  getComments():any {
    const httpOptions = {
    }; 
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/comments`,  httpOptions);
  }

  getUsers():any {
    const httpOptions = {
    }; 
    return this.httpClient.get(`https://jsonplaceholder.typicode.com/users`,  httpOptions);
  }

  /*downloadexcelremediation(idform):any {
    
    const httpOptions = {
      responseType: 'arraybuffer' as 'arraybuffer'
    }; 
    
    return this.httpClient.post(`${AppSettings.MICRO_REMEDIATION}remediation/excel/`+idform,'', httpOptions);
  }*/


}
