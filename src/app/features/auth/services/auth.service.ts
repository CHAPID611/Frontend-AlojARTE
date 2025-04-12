import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    // Asegurar que los datos estén en el formato correcto
    const formattedData = {
      cre_profilePhoto: null,
      cre_email: userData.email,
      cre_rol: 1,
      cre_isVerified: true,
      cre_codeVerify: '',
      cre_password: userData.password,
      people: {
        cre_name: userData.people.name,
        cre_lastname: userData.people.lastname,
        cre_birthdate: userData.people.birthdate,
        cre_typeDni: 1,
        cre_dni: userData.people.dni,
        cre_phone: userData.people.phone,
        cre_createdAt: new Date()
      }
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    console.log('Datos formateados:', JSON.stringify(formattedData));

    return this.http.post(`${this.apiUrl}/register`, formattedData, { headers });
  }

  verifyAccount(verificationData: any): Observable<{access_token: string}> {
    return this.http.put<{access_token: string}>(`${this.apiUrl}/verify`, verificationData);
  }

  recoveryPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recovery`, { email });
  }

  verifyRecoveryCode(verificationData: any): Observable<{token: {access_token: string}}> {
    return this.http.put<{token: {access_token: string}}>(`${this.apiUrl}/recoveryVerified`, verificationData);
  }
}