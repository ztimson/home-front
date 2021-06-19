import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {WeatherComponent} from './views/weather/weather.component';
import {SecurityComponent} from './views/security/security.component';
import {BatteryComponent} from './views/battery/battery.component';
import {LoginComponent} from './views/login/login.component';
import {LoginGuard} from './guards/login.guard';

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
export class AppRoutes { }
