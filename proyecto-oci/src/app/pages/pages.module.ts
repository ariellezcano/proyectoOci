import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './compartido/footer/footer.component';
import { NavComponent } from './compartido/nav/nav.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { WgCargandoComponent } from './widgets/wg-cargando/wg-cargando.component';
import { WgPaginateComponent } from './widgets/wg-paginate/wg-paginate.component';
import { SidebarComponent } from './compartido/sidebar/sidebar.component';

@NgModule({
  declarations: [
    PagesComponent,
    WgCargandoComponent,
    WgPaginateComponent,
    NavComponent,
    FooterComponent,
    SidebarComponent,
  ],

  exports: [],
  imports: [BrowserModule, FormsModule, HttpClientModule, PagesRoutingModule],
  providers: [],
  bootstrap: [PagesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
