import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guads/auth.guard';
import { AbmArchivoComponent } from './component/abm/abm-archivo/abm-archivo.component';
import { AbmConsultaUsuarioComponent } from './component/abm/abm-consulta-usuario/abm-consulta-usuario.component';
import { AbmExpedienteComponent } from './component/abm/abm-expediente/abm-expediente.component';
import { AbmRegistroCivilComponent } from './component/abm/abm-registro-civil/abm-registro-civil.component';
import { AbmTematicaComponent } from './component/abm/abm-tematica/abm-tematica.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { LstArchivoComponent } from './lst/lst-archivo/lst-archivo.component';
import { LstExpedienteComponent } from './lst/lst-expediente/lst-expediente.component';
import { LstTematicaComponent } from './lst/lst-tematica/lst-tematica.component';
import { LstUsuariosComponent } from './lst/lst-usuarios/lst-usuarios.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: PrincipalComponent, canActivate: [AuthGuard] },
      {
        path: 'lst-archivos',
        children: [
          {
            path: 'abm/:id',
            component: AbmArchivoComponent,
            canActivate: [AuthGuard],
          },
          {
            path: '',
            component: LstArchivoComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'lst-tematica',
        children: [
          {
            path: 'abm/:id',
            component: AbmTematicaComponent,
            canActivate: [AuthGuard],
          },
          {
            path: '',
            component: LstTematicaComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'lst-expediente',
        children: [
          {
            path: 'abm/:id',
            component: AbmExpedienteComponent,
            canActivate: [AuthGuard],
          },
          {
            path: '',
            component: LstExpedienteComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'abmArchivo/:id',
            component: AbmArchivoComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'lst-usuarios',
        children: [
          {
            path: 'abm/:id',
            component: AbmRegistroCivilComponent,
            canActivate: [AuthGuard],
          },
          {
            path: '',
            component: LstUsuariosComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'busqueda-usuario',
        children: [
          {
            path: 'abm',
            component: AbmConsultaUsuarioComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
