import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(), // Proveedor para HttpClient
        provideRouter(routes), // Configuración de rutas (lazy loading)
    ],
})
