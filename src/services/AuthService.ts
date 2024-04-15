import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  public googleLogin(googleToken: string) {
    this.http.post<{token: string}>('api/Auth', {googleToken})
      .subscribe((res) => {
        localStorage.setItem("token", res.token);
      })

  }

  public getToken(): string | null {
    return localStorage.getItem("token");
  }

  public logout(): void {
    localStorage.removeItem("token");
  }
}
