import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmArchivoComponent } from './component/abm/abm-archivo/abm-archivo.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { LstArchivoComponent } from './lst/lst-archivo/lst-archivo.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
