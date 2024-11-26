import { Routes } from '@angular/router';
import { CatalogoComponent } from './shared/components/catalogo/catalogo.component';
import { ProjectComponent } from './features/project/project.component';
import { AddListingComponent } from './shared/Admin/Zcomponens/agregar-catalogo/add-listing.component';
import { CatalogoListComponent } from './shared/Admin/Zcomponens/catalogo-list/catalogo-list.component';
import { HeadComponent } from './shared/Admin/Zcomponens/head-sidebar/head.component';

export const routes: Routes = [
  { path: 'catalogo',
     component: CatalogoComponent
  },
  { 
    path: 'project',
    component: ProjectComponent
  },
  { 
    path: 'add-catalogo',
    component: AddListingComponent
  },
  { 
    path: 'list-catalogos',
    component: CatalogoListComponent
  },
  { 
    path: 'app-head',
    component: HeadComponent
  },
  { 
    path: '',
    redirectTo: '/catalogo',
    pathMatch: 'full' 
  }, // Redirección inicial
  { 
    path: '**',
    redirectTo: '/catalogo'
  }, // Ruta comodín para manejar errores
];
