import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const slideInAnimation = trigger('slideInAnimation', [
  state('void', style({ transform: 'translateX(100%)', opacity: 0 })),
  state('*', style({ transform: 'translateX(0)', opacity: 1 })),
  transition(':enter', [animate('1s ease-out')]),
  transition(':leave', [
    animate(
      '0.5s ease-in',
      style({ transform: 'translateX(100%)', opacity: 0 })
    ),
  ]),
]);
