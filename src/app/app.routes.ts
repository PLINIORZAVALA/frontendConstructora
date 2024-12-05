import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCatalogoComponent } from './shared/components/catalogo/crear-catalogo/crear-catalogo.component';
import { CatalogoComponent } from './shared/components/catalogo/catalogo.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
      path: '', 
      canActivate: [AuthGuard], 
      children: [
        { path: 'dashboard', component: CatalogoComponent },
        { path: 'crear', component: CrearCatalogoComponent },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      ],
    },
    { path: '**', redirectTo: 'login' },
  ];