import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideServerRendering } from '@angular/platform-server';

bootstrapApplication(AppComponent, {
  providers: [
    provideServerRendering(), // Proveedor para renderizado en servidor
    provideHttpClient(),        // Proveedor para HttpClient
    provideRouter(routes)       // Configuración de rutas
  ]
});
