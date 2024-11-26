import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet, 
    RouterLinkActive,
  ],
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {

}
