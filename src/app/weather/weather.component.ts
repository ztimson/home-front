import {Component, OnInit} from '@angular/core';
import {WeatherService} from './weather.service';
import {timer} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit {
    day = false;

    constructor(public weatherService: WeatherService) { }

    ngOnInit() {
        timer(0, 1000).pipe(filter(() => !!this.weatherService.weather[0])).subscribe(() => {
            const now = new Date().getTime();
            const sunrise = this.weatherService.weather[0].sunrise.getTime();
            const sunset = this.weatherService.weather[0].sunset.getTime();

            this.day = now > sunrise && now < sunset;
            let diff = sunset - sunrise;
            let current = new Date().getTime() - sunrise;
            this.drawSunChart(current / diff);
        });
    }

    drawSunChart(progress: number) {
        const c = <HTMLCanvasElement>document.getElementById('myCanvas');
        if (c) {
            const ctx = c.getContext('2d');

            // All the points in 2D space we care about
            const width = c.width;
            const height = c.height;
            const centerX = width / 2;
            const centerY = height - 20;
            const radius = height * 0.8;
            const pointX = centerX + radius * Math.cos(Math.PI * (1 + progress));
            const pointY = centerY + radius * Math.sin(Math.PI * (1 + progress));

            // Reset
            ctx.clearRect(0, 0, width, height);

            // Path background
            ctx.fillStyle = '#aeaeae';
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, Math.PI, 0);
            ctx.fill();
            ctx.stroke();

            // Path
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#585858';
            ctx.fillStyle = '#585858';
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, Math.PI, 0);
            ctx.stroke();

            // Show sun
            if(this.day) {
                // Stroke background
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#e5df00';
                ctx.fillStyle = '#b3ad00';
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, Math.PI, Math.PI * (1 + progress));
                ctx.lineTo(pointX, centerY);
                ctx.fill();
                ctx.stroke();

                // Stroke
                ctx.lineWidth = 6;
                ctx.strokeStyle = '#e5df00';
                ctx.fillStyle = '#e5df00';
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, Math.PI, Math.PI * (1 + progress));
                ctx.stroke();

                // Stroke end dot
                ctx.lineWidth = 1;
                ctx.fillStyle = '#e5df00';
                ctx.beginPath();
                ctx.arc(pointX, pointY, 6, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            }
        }
    }
}
