import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WeatherComponent} from './weather/weather.component';
import {SecurityComponent} from './security/security.component';
import {SettingsComponent} from './settings/settings.component';
import {BatteryComponent} from './battery/battery.component';
import {LoginComponent} from './login/login.component';
import {LoginGuard} from './login/login.guard';

const routes: Routes = [
    {path: 'battery', component: BatteryComponent, canActivate: [LoginGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard]},
    {path: 'login', component: LoginComponent, data: {hide: true}},
    {path: 'security', component: SecurityComponent, canActivate: [LoginGuard]},
    {path: 'settings', component: SettingsComponent, canActivate: [LoginGuard]},
    {path: 'weather', component: WeatherComponent, canActivate: [LoginGuard]},
    {path: '**', redirectTo: '/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
