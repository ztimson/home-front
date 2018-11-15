import {
    trigger,
    animate,
    transition,
    style,
    query, group
} from '@angular/animations';

export const expandDown = trigger('expandDown', [
    transition('void => *', [
        style({opacity: 0, transform: 'translateY(-100%)'}),
        animate('0.5s', style({opacity: 1, transform: 'translateY(0%)'}))
    ])
]);

export const fade = trigger('fade', [
    transition('void => *', [
        style({opacity: 0}),
        animate('0.5s ease-in-out', style({opacity: 1}))
    ])
]);

export const routerTransition = trigger('routerTransition', [
    transition('* <=> *', [
        query(':enter, :leave', style({position: 'fixed', width: '100%'}), {optional: true}),
        group([
            query(':enter', [
                style({transform: 'translateX(100%)'}),
                animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
            ], {optional: true}), query(':leave', [
                style({transform: 'translateX(0%)'}),
                animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
            ], {optional: true}),
        ])
    ])
]);
