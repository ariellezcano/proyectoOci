import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { LstTematicaComponent } from './lst/lst-tematica/lst-tematica.component';
import { ComboTematicaComponent } from './componentes/combo-tematica/combo-tematica.component';
import { FilTematicaComponent } from './filtros/fil-tematica/fil-tematica.component';
import { AbmTematicaComponent } from './component/abm/abm-tematica/abm-tematica.component';
import { LstExpedienteComponent } from './lst/lst-expediente/lst-expediente.component';
import { FilExpedienteComponent } from './filtros/fil-expediente/fil-expediente.component';
import { AbmExpedienteComponent } from './component/abm/abm-expediente/abm-expediente.component';
import { AbmRegistroCivilComponent } from './component/abm/abm-registro-civil/abm-registro-civil.component';
import { LstUsuariosComponent } from './lst/lst-usuarios/lst-usuarios.component';
import { FilUsuariosComponent } from './filtros/fil-usuarios/fil-usuarios.component';
import { CommonModule } from '@angular/common';
import { ComboSexoComponent } from './componentes/combo-sexo/combo-sexo.component';
import { FilUsuarioOciComponent } from './filtros/fil-usuario-oci/fil-usuario-oci.component';
import { AbmConsultaUsuarioComponent } from './component/abm/abm-consulta-usuario/abm-consulta-usuario.component';
import { VerificacionComponent } from './compartido/verificacion/verificacion.component';
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
    LstTematicaComponent,
    ComboTematicaComponent,
    FilTematicaComponent,
    AbmTematicaComponent,
    LstExpedienteComponent,
    FilExpedienteComponent,
    AbmExpedienteComponent,
    LstUsuariosComponent,
    AbmRegistroCivilComponent,
    FilUsuariosComponent,
    ComboSexoComponent,
    FilUsuarioOciComponent,
    AbmConsultaUsuarioComponent
  ],

  exports: [],
  imports: [
    BrowserModule,
    AutocompleteLibModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PagesRoutingModule,
  ],
  providers: [],
  bootstrap: [PagesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
