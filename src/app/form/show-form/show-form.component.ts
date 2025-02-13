import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Form} from "../../../models/Form";
import {NgForOf, NgIf} from "@angular/common";
import {ResponseCreate} from "../../../models/ResponseCreate";
import {Answer} from "../../../models/Answer";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShowFormService} from "../../../services/ShowFormService";

@Component({
  selector: 'app-show-form',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './show-form.component.html',
  styleUrl: './show-form.component.css'
})
export class ShowFormComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient,
              private showFormService: ShowFormService) {
  }

  url: string = "";
  form: Form = new Form();
  responseForm: ResponseCreate = new ResponseCreate();
  selectedOptions: number[] = [];
  isValidResponse: boolean = true;

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get("url")!;
    this.http.get<Form>(`Api/Form/${this.url}`)
      .subscribe((response) => {
        this.form = response;
        this.responseForm.formId = this.form.id;
        this.responseForm.answers = [];
        response.questions.forEach((q) => {
          let answer = new Answer();
          answer.questionId = q.id;
          answer.selectedOptions = [];
          this.responseForm.answers.push(answer);
        });
      });
  }

  submit() {
    if (this.showFormService.isValidResponse(this.responseForm, this.form)) {
      this.showFormService.submitResponse(this.responseForm)
    } else {
      this.isValidResponse = false;
    }
  }

  selectCheckbox(optionId: number, questionId: number) {
    let question = this.responseForm.answers.find(ans => ans.questionId === questionId);
    if (!question) {
      return
    }

    if (question.selectedOptions.includes(optionId)) {
      let index: number = question.selectedOptions.indexOf(optionId);
      if (index > -1) {
        question.selectedOptions.splice(index, 1);
      }
    } else {
      question.selectedOptions.push(optionId);
    }
  }

  selectRadio(optionId: number, questionId: number) {
    let question = this.responseForm.answers.find(ans => ans.questionId === questionId);
    if (!question) {
      return
    }
    question.selectedOptions = [optionId];
  }
}
