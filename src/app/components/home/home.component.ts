import { Component, OnInit, ElementRef, Inject, OnDestroy, Renderer2 } from '@angular/core';
import { AppService } from '../../app.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import * as Rellax from 'rellax';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  public albumData = [];
  public photoData = [];
  public photoArtistsData = [];
  public commentsData = [];
  public usersData = [];
  public displayedColumns;
  public viewPlay: boolean;
  public musicPlay: number;
  public intervalId: any;
  public nameArtist: string;
  public numSong: number;
  public nameSong: string;
  public contMinute: number;
  public searchTerm: string;

  public page = 2;
  public pageSize = 0;
  public collectionSize = 0;
  public users = [];

  constructor( private element : ElementRef, 
    @Inject(AppService) appService: AppService,
    private renderer : Renderer2, config: NgbAccordionConfig) {

      config.closeOthers = true;
      config.type = 'info';

      appService.getAlbum().subscribe((res) => {

        this.albumData.push(res);
        // console.log('this.albumData: ', this.albumData);
  
      }
      , (error) => {
        console.log(error);
      });

      appService.getPhotos().subscribe((res) => {

        this.photoData = res.slice(5, 15);
        this.photoArtistsData = res.slice(0, 4);

        // console.log('this.photoArtistsData: ', this.photoArtistsData);
  
      }
      , (error) => {
        console.log(error);
      });

      appService.getComments().subscribe((res) => {

        this.commentsData = res.slice(5, 15);

        // console.log('this.CommentsData: ', this.commentsData);
  
      }
      , (error) => {
        console.log(error);
      });

      appService.getUsers().subscribe((res) => {
        
        this.usersData = res;
        ;
        this.users = this.usersData;

        this.pageSize = 5;
        this.collectionSize = 10;

        this.refreshArtist();

        // console.log('this.usersData: ', this.usersData);
  
      }
      , (error) => {
        console.log(error);
      });

    }

      data : Date = new Date();
      
      focus;
      focus1;
      focus2;
  
      date: {year: number, month: number};
      model: NgbDateStruct;
  
      public isCollapsed = true;
      public isCollapsed1 = true;
      public isCollapsed2 = true;
  
      state_icon_primary = true;
      
      isWeekend(date: NgbDateStruct) {
          const d = new Date(date.year, date.month - 1, date.day);
          return d.getDay() === 0 || d.getDay() === 6;
      }
  
      isDisabled(date: NgbDateStruct, current: {month: number}) {
          return date.month !== current.month;
      }
  
      ngOnInit() {

        this.viewPlay = false;
        this.musicPlay = 0;
        this.contMinute = 1;

        var rellaxHeader = new Rellax('.rellax-header');
  
          var navbar = document.getElementsByTagName('nav')[0];
          navbar.classList.add('navbar-transparent');
          var body = document.getElementsByTagName('body')[0];
          body.classList.add('index-page');
      }
      ngOnDestroy(){
          var navbar = document.getElementsByTagName('nav')[0];
          navbar.classList.remove('navbar-transparent');
          var body = document.getElementsByTagName('body')[0];
          body.classList.remove('index-page');
      }

      refreshArtist(): void {
        this.users = this.usersData.map((user, i) => ({id: i + 1, ...user}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      }

      playMusic(nameArtist, numSong, nameSong): void{

        clearInterval(this.intervalId);
        this.musicPlay = 0;

        this.nameArtist = nameArtist;
        this.numSong = numSong+1;
        this.nameSong = nameSong;

        this.viewPlay = true;

        this.intervalId = setInterval(()=>{  

          this.musicPlay++;
          
          if(this.musicPlay === 59){

              console.log('intervalId: ', this.intervalId);

              clearInterval(this.intervalId);
              this.musicPlay = 0;
          }

          
        }, 1000);
      
      }

      search(value: string): void {

        console.log('value: ', value);

        this.users = this.usersData.filter((val) => val.name.toLowerCase().includes(value.toLowerCase()));
        this.collectionSize = this.users.length;

        if (!value){
          this.refreshArtist();
        }
      }

}
