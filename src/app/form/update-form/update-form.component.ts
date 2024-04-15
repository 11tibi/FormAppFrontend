import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Form} from "../../../models/Form";
import {CreateEditTemplateComponent} from "../create-edit-template/create-edit-template.component";
import {MultipleChoiceComponent} from "../../form-question-type/multiple-choice/multiple-choice.component";
import {CheckboxesComponent} from "../../form-question-type/checkboxes/checkboxes.component";
import {Checkbox} from "../../../models/Checkbox";
import {Options} from "../../../models/Options";
import {FormCreate} from "../../../models/FormCreate";
import {ConfirmationModalComponent} from "../../confirmation-modal/confirmation-modal.component";
import {ModalService} from "../../confirmation-modal/confirmation-modal.service";

@Component({
  selector: 'app-update-form',
  standalone: true,
  imports: [
    CreateEditTemplateComponent,
    ConfirmationModalComponent
  ],
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.css'
})
export class UpdateFormComponent implements OnInit {
  @ViewChild(CreateEditTemplateComponent) createComponent!: CreateEditTemplateComponent;

  constructor(private router: Router,
              private http: HttpClient,
              private route: ActivatedRoute,
              private modalService: ModalService) {
  }

  url: string = "";
  form: Form = new Form();
  questions: any[] = [];

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get("url")!;
    this.http.get<Form>(`Api/Form/${this.url}`)
      .subscribe(r => {
        this.form = r;
        this.addQuestions();
      });
  }

  addQuestions() {
    this.form.questions.forEach(q => {
      let options = q.options.filter(o => new Options(o.id, o.questionId, o.optionText))
      switch (q.questionTypeId) {
        case 1:
          this.questions.push({
            component: MultipleChoiceComponent, id: this.questions.length,
            checkbox: new Checkbox(q.id, q.questionTypeId, q.questionText, options, q.isRequired,)
          });
          break;
        case 2:
          this.questions.push({
            component: CheckboxesComponent, id: this.questions.length,
            checkbox: new Checkbox(q.id, q.questionTypeId, q.questionText, options, q.isRequired,)
          });
          break;
        default:
          console.log(q.questionTypeId);
      }
    })
  }

  update(): void {
    let data: FormCreate = new FormCreate();
    data.Title = this.createComponent.formTitle;

    this.createComponent.checkboxesComponents.forEach((item) => data.Questions.push(item.checkbox));
    this.createComponent.multipleChoiceComponents.forEach((item) => data.Questions.push(item.checkbox));

    this.http.patch(`Api/Form/${this.form.id}`, data)
      .subscribe(r => {
        this.router.navigate(["view-forms"]);
      });
  }

  submit(): void {
    this.modalService.open({
      title: "Save changes",
      description: "Are you sure you want to save the changes?",
      confirm: this.update.bind(this)
    });
  }
}
