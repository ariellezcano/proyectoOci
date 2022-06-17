import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/compartido/login/login.component';
import { VerificacionComponent } from './pages/compartido/verificacion/verificacion.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'verificacion/:id',
    component: VerificacionComponent,
  },

  /*{
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },*/
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
