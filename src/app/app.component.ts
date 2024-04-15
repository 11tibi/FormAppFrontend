import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import {ConfirmationModalComponent} from "./confirmation-modal/confirmation-modal.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SocialLoginModule, ConfirmationModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Form App';
}
