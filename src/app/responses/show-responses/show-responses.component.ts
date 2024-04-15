import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Responses} from "../../../models/Responses";
import {DatePipe, NgForOf} from "@angular/common";
import {Form} from "../../../models/Form";
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";
import {environment} from "../../../environments/environment";
import {ModalService} from "../../confirmation-modal/confirmation-modal.service";

@Component({
  selector: 'app-show-responses',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    CdkCopyToClipboard
  ],
  templateUrl: './show-responses.component.html',
  styleUrl: './show-responses.component.css'
})
export class ShowResponsesComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private modalService: ModalService) {
  }

  url: string = "";
  responses: Responses[] = [];
  form: Form = new Form();

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get("url")!;
    this.http.get<Responses[]>(`Api/Response/Form/${this.url}`)
      .subscribe((response) => {
        this.responses = response;
      });
    this.http.get<Form>(`Api/Form/${this.url}`)
      .subscribe((response) => {
        this.form = response;
      });
  }

  goToResponse(id: number) {
    this.router.navigate([`response/${id.toString()}`], {})
  }

  copyLink(url: string) {
    return `${environment.frontend_url}/form/${url}`;
  }

  deleteResponse() {
    this.http.delete(`Api/Form/${this.form.id}`).subscribe(() => {
      this.router.navigate(["view-forms"], {});
    });
  }

  delete() {
    this.modalService.open({
      title: "Delete response",
      description: "Are you sure that you want to delete this response?",
      confirm: this.deleteResponse.bind(this)
    });
  }

  edit() {
    this.router.navigate([`form/edit/${this.form.url}`], {});
  }
}
