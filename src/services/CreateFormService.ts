import {Injectable} from "@angular/core";
import {FormCreate} from "../models/FormCreate";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CreateFormService {
  constructor(private router: Router, private http: HttpClient) {
  }

  isValidForm(data: FormCreate): boolean {
    if (data.Title == "" || data.Questions.length == 0) {
      return false;
    }

    for (let i = 0; i < data.Questions.length; i++) {
      if (data.Questions[i].QuestionText == "" || data.Questions[i].Choices.length == 0) {
        return false;
      }
      for (let j = 0; j < data.Questions[i].Choices.length; j++) {
        if (data.Questions[i].Choices[j].optionText == "") {
          return false;
        }
      }
    }

    return true;
  }

  submitNewForm(data: FormCreate) {
    this.http.post("Api/Form", data, {observe: "response"})
      .subscribe((response) => {
        if (response.status == 201 || response.status == 204) {
          this.router.navigate(["/view-forms"], {});
        }
      });
  }
}
