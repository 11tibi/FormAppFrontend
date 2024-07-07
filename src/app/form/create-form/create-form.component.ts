import {Component, ViewChild} from '@angular/core';
import {MultipleChoiceComponent} from "../../form-question-type/multiple-choice/multiple-choice.component";
import {CheckboxesComponent} from "../../form-question-type/checkboxes/checkboxes.component";
import {NgComponentOutlet, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FormCreate} from "../../../models/FormCreate";
import {CreateEditTemplateComponent} from "../create-edit-template/create-edit-template.component";
import {CreateFormService} from "../../../services/CreateFormService";

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
    CreateEditTemplateComponent,
    NgIf
  ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent {
  @ViewChild(CreateEditTemplateComponent) createComponent!: CreateEditTemplateComponent;
  isValidForm: boolean = true;

  constructor(public createFormService: CreateFormService) {
  }

  submit() {
    let data: FormCreate = new FormCreate();
    data.Title = this.createComponent.formTitle;

    this.createComponent.checkboxesComponents.forEach((item) => data.Questions.push(item.checkbox));
    this.createComponent.multipleChoiceComponents.forEach((item) => data.Questions.push(item.checkbox));

    if (this.createFormService.isValidForm(data)) {
      this.createFormService.submitNewForm(data);
    } else {
      this.isValidForm = false;
    }
  }
}
