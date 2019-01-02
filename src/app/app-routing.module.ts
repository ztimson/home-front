import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WeatherComponent} from './weather/weather.component';
import {SecurityComponent} from './security/security.component';
import {BatteryComponent} from './battery/battery.component';
import {LoginComponent} from './login/login.component';
import {LoginGuard} from './login/login.guard';

const routes: Routes = [
    {path: 'battery', component: BatteryComponent, canActivate: [LoginGuard]},
    {path: 'login', component: LoginComponent, data: {hide: true, noAnimation: true}},
    {path: 'security', component: SecurityComponent, canActivate: [LoginGuard]},
    {path: 'weather', component: WeatherComponent, canActivate: [LoginGuard]},
    {path: '', component: DashboardComponent, canActivate: [LoginGuard]},
    {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
