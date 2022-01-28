import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      //   { path: 'principal', component: PrincipalComponent },
      //   { path: 'areas', component: TableroAreaComponent },
      //   {
      //     path: 'lst-equipos',
      //     children: [
      //       {
      //         path: 'abm/:id',
      //         component: AbmIngresoEquipoComponent,
      //       },
      //       {
      //         path: '',
      //         component: LstEquiposComponent,
      //       },
      //     ],
      //   },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
