import {Component, ViewChild} from '@angular/core';
import {MultipleChoiceComponent} from "../../form-question-type/multiple-choice/multiple-choice.component";
import {CheckboxesComponent} from "../../form-question-type/checkboxes/checkboxes.component";
import {NgComponentOutlet, NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormCreate} from "../../../models/FormCreate";
import {CreateEditTemplateComponent} from "../create-edit-template/create-edit-template.component";

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [
    MultipleChoiceComponent,
    CheckboxesComponent,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    NgComponentOutlet,
    FormsModule,
    CreateEditTemplateComponent
  ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent {
  @ViewChild(CreateEditTemplateComponent) createComponent!: CreateEditTemplateComponent;

  constructor(private router: Router, private http: HttpClient) {
  }

  submit() {
    let data: FormCreate = new FormCreate();
    data.Title = this.createComponent.formTitle;

    this.createComponent.checkboxesComponents.forEach((item) => data.Questions.push(item.checkbox));
    this.createComponent.multipleChoiceComponents.forEach((item) => data.Questions.push(item.checkbox));

    this.http.post("Api/Form", data, {observe: "response"})
      .subscribe((response) => {
        if (response.status == 201 || response.status == 204) {
          this.router.navigate(["/view-forms"], {});
        }
      });
  }
}
