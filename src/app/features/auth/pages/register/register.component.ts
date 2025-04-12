import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegistroComponent {
  registroForm: FormGroup;
  errorMessage: string = '';

  // Definir el validador como método estático antes del constructor
  static passwordMatchValidator(g: FormGroup) {
    const password = g.get('password');
    const confirmPassword = g.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null
      : { mismatch: true };
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      dni: ['', Validators.required],
      phone: ['', Validators.required]
    }, { validator: RegistroComponent.passwordMatchValidator }); // Usar el método estático
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const formData = this.registroForm.getRawValue();
      const userData = {
        profilePhoto: null,
        email: formData.email.toLowerCase().trim(),
        rolId: 1,
        verified: true,
        password: formData.password,
        people: {
          name: formData.name.trim(),
          lastname: formData.lastname.trim(),
          birthdate: formData.birthdate,
          typeDniId: 1,
          dni: formData.dni.trim(),
          phone: formData.phone.toString()
        }
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error detallado:', error);
          if (error.status === 409) {
            this.errorMessage = 'Este correo electrónico ya está registrado. Por favor, use otro.';
          } else if (error.status === 400) {
            this.errorMessage = 'Los datos ingresados no son válidos. Por favor, verifique la información.';
          } else {
            this.errorMessage = 'Error en el servidor. Por favor, intente más tarde.';
          }
        }
      });
    }
  }

  getErrorMessage(field: string): string {
    const control = this.registroForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('email')) {
      return 'Por favor ingrese un email válido';
    }
    if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    if (field === 'confirmPassword' && this.registroForm.hasError('mismatch')) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }
}
