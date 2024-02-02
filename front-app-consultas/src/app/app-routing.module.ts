import { ChangePasswordComponent } from './changepassword/change-password.component';
import { SendEmailComponent } from './changepassword/send-email.component';
import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';

import { ListaProductoComponent } from './producto/lista-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto.component';
import { EditarProductoComponent } from './producto/editar-producto.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { ProdGuardService } from './guards/prod-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './consultas/home/home.component';
import { LoginConsultasComponent } from './consultas/login-consultas/login-consultas.component';
import { RegisterConsultasComponent } from './consultas/register-consultas/register-consultas.component';
import { StartConsultasComponent } from './consultas/start-consultas/start-consultas.component';
import { DasboardComponent } from './consultas/dasboard/dasboard.component';
import { CrearConsultasComponent } from './consultas/crear-consultas/crear-consultas.component';
import { PagosComponent } from './consultas/pagos/pagos.component';
import { MedicosComponent } from './consultas/medicos/medicos.component';
import { VideollamadaComponent } from './consultas/videollamada/videollamada.component';
import { CalendarioComponent } from './consultas/calendario/calendario.component';



const routes: Routes = [ 
  { path: '', component:HomeComponent},
  { path: 'start-consultas', component:StartConsultasComponent, canActivate: [LoginGuard] },  
  { path: 'login-consultas', component:LoginConsultasComponent, canActivate: [LoginGuard] },
  { path: 'register-consultas', component:RegisterConsultasComponent, canActivate: [LoginGuard] },
  { path: 'dashboard', component:DasboardComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'crear-consulta', component:CrearConsultasComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin','user'] } },  
  { path: 'medicos', component:MedicosComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin','user'] }},  
  { path: 'calendario', component:CalendarioComponent, canActivate: [ProdGuardService], data: { expectedRol: ['admin','user'] }},  
  { path: 'pagos', component:PagosComponent },  
  { path: 'video', component:VideollamadaComponent },  
  
 
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
