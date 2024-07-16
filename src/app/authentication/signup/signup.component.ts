import {HttpClient, HttpClientModule} from "@angular/common/http";

declare var google: any;
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../../services/AuthService";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [HttpClientModule]
})
export class SignupComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: environment.google_client_id,
      callback: (response: any): void => {
        this.authService.googleLogin(response.credential);
        this.router.navigate(["/view-forms"], {});
      }
    })

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      size: "large",
    })
  }
}
