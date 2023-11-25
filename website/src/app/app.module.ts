import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {environment} from '../environments/environment';
import {AppRoutes} from './app.routes';
import {AdminGuard} from './guards/admin.guard';
import {GuestGuard} from './guards/guest.guard';
import {LoginGuard} from './guards/login.guard';
import {MaterialModule} from './material.module';
import {AppComponent} from './views/app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {BatteryComponent} from './views/battery/battery.component';
import {WeatherComponent} from './views/weather/weather.component';
import {SecurityComponent} from './views/security/security.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './views/login/login.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {RoundPipe} from './pipes/round.pipe';
import {BatteryWidgetComponent} from './components/battery-widget/batteryWidget.component';
import {WeatherWidgetComponent} from './components/weather-widget/weatherWidget.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {GaugeModule} from 'angular-gauge';
import {ChartsModule} from 'ng2-charts';

const APP_COMPONENTS = [
    BatteryWidgetComponent,
    WeatherWidgetComponent
];

const APP_GUARDS = [
    AdminGuard,
    GuestGuard,
    LoginGuard
];

const APP_PIPES = [
    RoundPipe
];

const APP_VIEWS = [
    AppComponent,
    BatteryComponent,
    DashboardComponent,
    LoginComponent,
    SecurityComponent,
    WeatherComponent
];

@NgModule({
    declarations: [
        APP_COMPONENTS,
        APP_PIPES,
        APP_VIEWS
    ],
    imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AppRoutes,
        BrowserModule,
        BrowserAnimationsModule,
        ChartsModule,
        FormsModule,
        GaugeModule.forRoot(),
        HttpClientModule,
        MaterialModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: false}),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the app is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
    ],
    providers: [APP_GUARDS],
    bootstrap: [AppComponent]
})
export class AppModule { }
