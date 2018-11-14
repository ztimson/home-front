import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WeatherComponent} from './weather/weather.component';
import {SecurityComponent} from './security/security.component';
import {SettingsComponent} from './settings/settings.component';
import {BatteryComponent} from './battery/battery.component';

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'battery', component: BatteryComponent},
    {path: 'weather', component: WeatherComponent},
    {path: 'security', component: SecurityComponent},
    {path: 'settings', component: SettingsComponent},
    {path: '**', redirectTo: '/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
