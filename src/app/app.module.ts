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
import {ServiceWorkerModule} from '@angular/service-worker';
import {RoundPipe} from './round.pipe';
import {BatteryWidgetComponent} from './battery/widget/batteryWidget.component';
import {WeatherWidgetComponent} from './weather/widget/weatherWidget.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {GaugeModule} from 'angular-gauge';
import {ChartsModule} from 'ng2-charts';

@NgModule({
    declarations: [
        AppComponent,
        BatteryWidgetComponent,
        DashboardComponent,
        BatteryComponent,
        WeatherComponent,
        SecurityComponent,
        LoginComponent,
        RoundPipe,
        WeatherWidgetComponent
    ],
    imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        ChartsModule,
        FormsModule,
        GaugeModule.forRoot(),
        HttpClientModule,
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
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: false}),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
