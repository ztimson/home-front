import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'round'
})
export class RoundPipe implements PipeTransform {
    transform(value: number, decimalPlaces: number = 0): any {
        const shift = Math.pow(10, decimalPlaces);
        return Math.round(value * shift) / shift;
    }
}
