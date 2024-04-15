import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Responses} from "../../../models/Responses";
import {Form} from "../../../models/Form";
import {ReactiveFormsModule} from "@angular/forms";
import {Options} from "../../../models/Options";
import {ModalService} from "../../confirmation-modal/confirmation-modal.service";

@Component({
  selector: 'app-show-response',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './show-response.component.html',
  styleUrl: './show-response.component.css'
})
export class ShowResponseComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService) {
  }

  id: string = "";
  response: Responses = new Responses();
  form: Form = new Form();

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("url")!;
    this.http.get<Responses>(`Api/Response/${this.id}`)
      .subscribe((r) => {
        this.response = r;
        this.http.get<Form>(`Api/Form/${this.response.form.url}`)
          .subscribe(r => {
            this.form = r;
          });
      });
  }

  isSelected(option: Options): boolean {
    return this.response.answers.find(e =>
      // @ts-ignore
      e.selectedOptions.find(so => so?.optionId == option.id)) != undefined;
  }

  deleteResponse(id: number) {
    this.http.delete(`Api/Response/${id}`)
      .subscribe(r => this.router.navigate([`view-forms`], {}));
  }

  delete(id: number) {
    this.modalService.open({
      title: "Delete response",
      description: "Are you sure that you want to delete this response?",
      confirm: this.deleteResponse.bind(this, id)
    });
  }
}
