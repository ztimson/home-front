import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {
    MatButtonModule, MatButtonToggleModule,
    MatCardModule,
    MatDividerModule, MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatListModule, MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BatteryComponent} from './battery/battery.component';
import {WeatherComponent} from './weather/weather.component';
import {SecurityComponent} from './security/security.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {environment} from '../environments/environment';
import * as firebase from 'firebase/app';
import {ServiceWorkerModule} from '@angular/service-worker';
import {LineChartModule, NgxChartsModule} from '@swimlane/ngx-charts';
import {RoundPipe} from './round.pipe';
import { WidgetComponent } from './battery/widget/widget.component';

export const firebaseApp = firebase.initializeApp(environment.firebase);

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        BatteryComponent,
        WeatherComponent,
        SecurityComponent,
        LoginComponent,
        RoundPipe,
        WidgetComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        LineChartModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatToolbarModule,
        NgxChartsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: false}),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
