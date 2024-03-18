import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-notfound-page',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './notfound-page.component.html',
  styleUrl: './notfound-page.component.css'
})
export class NotfoundPageComponent {

}
