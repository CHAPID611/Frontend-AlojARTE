import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
    },
    {
        path: 'habitacion',
        loadChildren: () => import('./features/habitacion/habitacion.routes').then(m => m.HABITACION_ROUTES),
    },
    {
        path: 'pago',
        loadChildren: () => import('./features/pago/pago.routes').then(m => m.PAGO_ROUTES),
    },
    {
        path: 'reserva',
        loadChildren: () => import('./features/reserva/reserva.routes').then(m => m.RESERVA_ROUTES),
    },
    {
        path: 'usuario',
        loadChildren: () => import('./features/usuario/usuario.routes').then(m => m.USUARIO_ROUTES),
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];
