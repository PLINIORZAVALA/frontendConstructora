import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-catalogo-list',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet, 
    RouterLinkActive,
  ],
  templateUrl: './catalogo-list.component.html',
  styleUrl: './catalogo-list.component.css'
})
export class CatalogoListComponent {

}
