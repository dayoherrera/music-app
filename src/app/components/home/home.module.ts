import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components.module';
import { TypographyComponent } from '../typography/typography.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from '../modal/modal.component';

@NgModule({
  declarations: [
    HomeComponent,
    TypographyComponent,
    NgbdModalBasic],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NouisliderModule,
    JwBootstrapSwitchNg2Module,
    ComponentsModule,
    FormsModule,
    NgbModule
  ]
})
export class HomeModule { }
