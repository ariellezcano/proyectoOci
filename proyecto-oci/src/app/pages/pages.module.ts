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
import { LstArchivoComponent } from './lst/lst-archivo/lst-archivo.component';
import { AbmArchivoComponent } from './component/abm/abm-archivo/abm-archivo.component';
import { FilUnidadAutocompletadoComponent } from './component/filtro/fil-unidad-autocompletado/fil-unidad-autocompletado.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FilArchivoComponent } from './filtros/fil-archivo/fil-archivo.component';
@NgModule({
  declarations: [
    PagesComponent,
    WgCargandoComponent,
    WgPaginateComponent,
    NavComponent,
    FooterComponent,
    SidebarComponent,
    LstArchivoComponent,
    AbmArchivoComponent,
    FilUnidadAutocompletadoComponent,
    FilArchivoComponent,
  ],

  exports: [],
  imports: [
    BrowserModule,
    AutocompleteLibModule,
    FormsModule,
    HttpClientModule,
    PagesRoutingModule,
  ],
  providers: [],
  bootstrap: [PagesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
