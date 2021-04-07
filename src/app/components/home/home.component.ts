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
  public CommentsData = [];

  constructor( private element : ElementRef, 
    @Inject(AppService) appService: AppService,
    private renderer : Renderer2, config: NgbAccordionConfig) {

      config.closeOthers = true;
      config.type = 'info';

      appService.getAlbum().subscribe((res) => {

        this.albumData.push(res);
        console.log('this.albumData: ', this.albumData);
  
      }
      , (error) => {
        console.log(error);
      });

      appService.getPhotos().subscribe((res) => {

        this.photoData = res.slice(5, 15);

        console.log('this.photoData: ', this.photoData);
  
      }
      , (error) => {
        console.log(error);
      });

      appService.getComments().subscribe((res) => {

        this.CommentsData = res.slice(5, 15);

        console.log('this.CommentsData: ', this.CommentsData);
  
      }
      , (error) => {
        console.log(error);
      });

    }

      data : Date = new Date();
  
      page = 4;
      page1 = 5;
      page2 = 3;
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
/**ngOnInit() {
  
          let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
          navbar.classList.add('navbar-transparent');
      }
      ngOnDestroy(){
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
      }
 */

}
