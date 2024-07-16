import {Component, Input, QueryList, ViewChildren} from '@angular/core';
import {MultipleChoiceComponent} from "../../form-question-type/multiple-choice/multiple-choice.component";
import {CheckboxesComponent} from "../../form-question-type/checkboxes/checkboxes.component";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";
import {Checkbox} from "../../../models/Checkbox";
import {Options} from "../../../models/Options";

@Component({
  selector: 'app-create-edit-template',
  standalone: true,
  imports: [
    CheckboxesComponent,
    FormsModule,
    MultipleChoiceComponent,
    NgForOf,
    NgSwitchCase,
    NgSwitch
  ],
  templateUrl: './create-edit-template.component.html',
  styleUrl: './create-edit-template.component.css'
})
export class CreateEditTemplateComponent {
  @ViewChildren(MultipleChoiceComponent) multipleChoiceComponents!: QueryList<MultipleChoiceComponent>;
  @ViewChildren(CheckboxesComponent) checkboxesComponents!: QueryList<CheckboxesComponent>;

  @Input() formTitle: string = "";

  @Input() questions: any[] = [];

  addQuestion($event: Event): void {
    switch (($event.currentTarget as HTMLSelectElement).value) {
      case "1":
        this.questions.push({
          component: MultipleChoiceComponent, id: this.questions.length,
          checkbox: new Checkbox(-1, 2, "",
            [new Options(-1, -1, "Option 1"),
              new Options(-1, -1, "Option 2")],
            true, "create")
        });
        break;
      case "2":
        this.questions.push({
          component: CheckboxesComponent, id: this.questions.length,
          checkbox: new Checkbox(-1, 1, "",
            [new Options(-1, -1, "Option 1"),
            new Options(-1, -1, "Option 2")],
            true, "create")
        });
        break;
      default:
        console.log(($event.currentTarget as HTMLSelectElement).value);
    }
    // Reset the select
    ($event.target as HTMLSelectElement).selectedIndex = 0;
  }

  delete(index: number) {
    this.questions.splice(index, 1);
  }

  protected readonly MultipleChoiceComponent = MultipleChoiceComponent;
  protected readonly CheckboxesComponent = CheckboxesComponent;
}
