import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatDividerModule, MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BatteryComponent } from './battery/battery.component';
import { WeatherComponent } from './weather/weather.component';
import { SecurityComponent } from './security/security.component';
import { SettingsComponent } from './settings/settings.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {environment} from '../environments/environment';
import * as firebase from 'firebase';
import {LoginGuard} from './login/login.guard';

export const firebaseApp = firebase.initializeApp(environment.firebase);

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        BatteryComponent,
        WeatherComponent,
        SecurityComponent,
        SettingsComponent,
        LoginComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
    ],
    providers: [LoginGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
