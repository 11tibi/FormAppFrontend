import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ResponseCreate} from "../models/ResponseCreate";
import {Form} from "../models/Form";

@Injectable({
  providedIn: 'root'
})
export class ShowFormService {
  constructor(private http: HttpClient, private router: Router,) {
  }

  isValidResponse(responseForm: ResponseCreate, form: Form): boolean {
    for (let i=0; i<responseForm.answers.length; i++) {
      if (form.questions[i].isRequired && responseForm.answers[i].selectedOptions.length == 0) {
        return false
      }
    }
    return true;
  }

  submitResponse(responseForm: ResponseCreate) {
    this.http.post("Api/Response", responseForm, {observe: "response"})
      .subscribe(response => {
        if (response.status == 201 || response.status == 204) {
          this.router.navigate(["/view-forms"], {});
        }
      });
  }
}
