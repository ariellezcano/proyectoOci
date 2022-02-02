import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmArchivoComponent } from './component/abm/abm-archivo/abm-archivo.component';
import { AbmTematicaComponent } from './component/abm/abm-tematica/abm-tematica.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { LstArchivoComponent } from './lst/lst-archivo/lst-archivo.component';
import { LstTematicaComponent } from './lst/lst-tematica/lst-tematica.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'principal', component: PrincipalComponent },
      //   { path: 'areas', component: TableroAreaComponent },
      {
        path: 'lst-archivos',
        children: [
          {
            path: 'abm/:id',
            component: AbmArchivoComponent,
          },
          {
            path: '',
            component: LstArchivoComponent,
          },
        ],
      },
      {
        path: 'lst-tematica',
        children: [
          {
            path: 'abm/:id',
            component: AbmTematicaComponent,
          },
          {
            path: '',
            component: LstTematicaComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
