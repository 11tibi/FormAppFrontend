import {HttpEvent, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const clone = req.clone({
    url: `${environment.api_url}/${req.url}`,
    headers: new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    })
  })
  return next(clone);
}
