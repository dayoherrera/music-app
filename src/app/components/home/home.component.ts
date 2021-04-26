import { Component, OnInit, ElementRef, Inject, OnDestroy, Renderer2 } from '@angular/core';
import { Howl } from 'howler';
import { AppService } from '../../app.service';
import * as faker from 'faker';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  
  public photoData = [];
  public photoArtistsData = [];
  public users = [];
  public commentsData = [];
  public usersData = [];
  public viewPlay: boolean;
  public musicPlay: number;
  public intervalId: any;
  public nameArtist: string;
  public numSong: number;
  public nameSong: string;
  public searchTerm: string;
  public page = 1;
  public pageSize = 0;
  public collectionSize = 0;

  storageRef: any;

  public soundsV = [
    new Howl({
      src: ['https://www.kozco.com/tech/piano2-CoolEdit.mp3'],
      autoplay: false,
      loop: true,
      volume: 0.5,
      onend: function() {
        // Finished!
      }
      }),
      new Howl({
        src: ['https://freesound.org/data/previews/381/381353_1676145-hq.mp3'],
        autoplay: false,
        loop: true,
        volume: 0.5,
        onend: function() {
          // Finished!
        }
      })
   ];


  public sound;

  constructor(private appService: AppService) { 
    this.getImagesArtists();
    this.getAlbum();
    this.getUsersList();   
    this.listSongs(); 
  }
  
      ngOnInit() {

        this.viewPlay = false;
        this.musicPlay = 0;
      }

      ngOnDestroy(){
      }

      refreshArtist(): void {

        this.users = this.usersData.map((user, i) => ({id: i + 1, ...user}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      }

      playMusic(nameArtist, numSong, nameSong): void{

        this.soundsV.forEach((sound)=>sound.stop());

        if(numSong % 2 === 0){
          
          this.soundsV[0].play();

        }else{
          
          this.soundsV[1].play();
        }

        clearInterval(this.intervalId);
        this.musicPlay = 0;

        this.nameArtist = nameArtist;
        this.numSong = numSong+1;
        this.nameSong = nameSong;

        this.viewPlay = true;

        this.intervalId = setInterval(()=>{  

          this.musicPlay++;
          
          if(this.musicPlay === 59){

              clearInterval(this.intervalId);
              this.musicPlay = 0;
          }

          
        }, 1000);
      
      }

      search(value: string): void {
        
        this.users = this.usersData.filter((val) => val.name.toLowerCase().includes(value.toLowerCase()));
        this.collectionSize = this.users.length;

        if (!value){
          this.refreshArtist();
        }
      }

      getImagesArtists(): void{

        this.photoArtistsData = []

        for (let image = 1; image <= 4; image++) {

          let people = faker.image.people();
          let imageUrl = faker.image.avatar(); 
          let title = faker.datatype.string();
          let lastName = faker.name.lastName();
          let firstName = faker.name.firstName();

          this.photoArtistsData.push({
              'id': image,
              'url': imageUrl,
              'people': people,
              'title': title,
              'first_name': firstName,
              'last_name': lastName,
          });
        }

      }

      getAlbum(): void{

        this.photoData = [];

        for (let i = 1; i <= 10; i++) {
          
          let people = `${faker.random.image()}?random=${Date.now()}`; 
          let title = faker.name.title();

          this.photoData.push({
              'id': i,
              'url': people,
              'title': title
          });

          let body = faker.commerce.productDescription();

          this.commentsData.push({
              'id': i,
              'body': body
          });
        }
      }

      getUsersList(): void{

        this.usersData = [];

        for (let i = 1; i <= 10; i++) {
          
          let firstName = faker.name.firstName();
          let company = faker.name.jobDescriptor();
          let website = faker.internet.domainName();

          this.usersData.push({
              'id': i,
              'name': firstName,
              'company': company,
              'website': website
          });
        }

        this.users = this.usersData;

        this.pageSize = 5;
        this.collectionSize = 10;
    
        this.refreshArtist();
      }

      listSongs(): void{
      }

}
