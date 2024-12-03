import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/login/auth.service';
import { LoginModel } from '../interfaces/login/login.model';  // Interfaz para las credenciales de login
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { FormsModule } from '@angular/forms'; // Para trabajar con formularios

@Component({
  selector: 'app-login',
  standalone: true,  // Esto indica que el componente es independiente
  imports: [FormsModule, CommonModule],  // Importamos FormsModule y CommonModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Modelo para el login
  loginModel: LoginModel = { 
    username: '',
    password: ''
  };

  // Propiedades para manejar el estado de login
  loginSuccess: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método para enviar el formulario
  onSubmit() {
    this.authService.login(this.loginModel).subscribe(
      response => {
        console.log('Inicio de sesión exitoso', response);
        
        // Guardar el estado de la sesión (usuario en localStorage)
        this.authService.setUserSession(response);

        // Mostrar éxito
        this.loginSuccess = true;
        this.errorMessage = '';

        // Redirigir al dashboard o a la página principal
        this.router.navigate(['/dashboard']);  // Aquí pones la ruta a la página que desees
      },
      error => {
        console.error('Error al iniciar sesión', error);

        // Mostrar mensaje de error
        this.errorMessage = 'Usuario o contraseña incorrectos.';
        this.loginSuccess = false;
      }
    );
  }
}
