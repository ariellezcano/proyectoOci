import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/compartido/login/login.component';
import { PagesModule } from './pages/pages.module';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PagesModule,
    HttpClientModule,
    CommonModule,
    AutocompleteLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
