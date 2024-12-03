// src/app/create-user/create-user.component.ts
import { Component } from '@angular/core';
import { UserService } from '../services/users/user.service';  // Asegúrate de que esta importación sea la correcta
import { CreateUser } from '../interfaces/users/create-user.interface'; 
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-user',
  standalone: true,  // Esto indica que el componente es independiente
  imports: [FormsModule, CommonModule],  // Importamos el módulo FormsModule y CommonModule aquí
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  user: CreateUser = {  // Definir el objeto de usuario vacío
    username: '',
    password: '',
    role: 'admin'  // Valor predeterminado, puedes cambiarlo si lo deseas
  };

  errorMessage: string = '';  // Para mostrar los errores de validación del backend

  constructor(private userService: UserService, private router: Router) {}

  // Método para enviar el formulario
  onSubmit() {
    this.errorMessage = '';  // Resetear el mensaje de error antes de enviar

    this.userService.createUser(this.user).subscribe(
      response => {
        console.log('Usuario creado exitosamente', response);
        this.router.navigate(['/']);  // Redirige a la página de inicio después de crear el usuario
      },
      error => {
        console.error('Error al crear el usuario', error);

        // Verificar el tipo de error y mostrar el mensaje correspondiente
        if (error.status === 400) {
          this.errorMessage = error.error.message;  // Asignamos el mensaje de error recibido desde el backend
        } else {
          this.errorMessage = 'Hubo un problema al crear el usuario. Por favor, intente de nuevo.';
        }
      }
    );
  }
}
