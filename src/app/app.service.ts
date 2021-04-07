import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class AppService{

  constructor(private httpClient: HttpClient) { }

  getAlbum():any {
    const httpOptions = {
    }; 
    return this.httpClient.get(`http://jsonplaceholder.typicode.com/albums`,  httpOptions);
  }

  getPhotos():any {
    const httpOptions = {
    }; 
    return this.httpClient.get(`http://jsonplaceholder.typicode.com/photos`,  httpOptions);
  }

  getComments():any {
    const httpOptions = {
    }; 
    return this.httpClient.get(`http://jsonplaceholder.typicode.com/comments`,  httpOptions);
  }

  /*downloadexcelremediation(idform):any {
    
    const httpOptions = {
      responseType: 'arraybuffer' as 'arraybuffer'
    }; 
    
    return this.httpClient.post(`${AppSettings.MICRO_REMEDIATION}remediation/excel/`+idform,'', httpOptions);
  }*/


}
