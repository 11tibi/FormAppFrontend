import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Form} from "../../../models/Form";
import {NgForOf} from "@angular/common";
import {environment} from "../../../environments/environment";
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";
import {ModalService} from "../../confirmation-modal/confirmation-modal.service";

@Component({
  selector: 'app-view-forms',
  standalone: true,
  imports: [
    NgForOf,
    CdkCopyToClipboard
  ],
  templateUrl: './view-forms.component.html',
  styleUrl: './view-forms.component.css'
})
export class ViewFormsComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient, private modalService: ModalService) {
  }

  forms: Form[] = [];

  ngOnInit(): void {
    this.http.get<Form[]>("Api/Form")
      .subscribe((response) => {
        this.forms = response;
      })
  }

  deleteForm(id: number, i: number) {
    this.http.delete(`Api/Form/${id}`).subscribe(() => {
      this.forms.splice(i, 1);
    });
  }

  delete(id: number, i: number) {
    this.modalService.open({
      title: "Delete form",
      description: "Are you sure that you want to delete this form?",
      confirm: this.deleteForm.bind(this, id, i)
    });
  }

  copyLink(url: string): string {
    return `${environment.frontend_url}/form/${url}`;
  }

  goToResponses(url: string) {
    this.router.navigate([`responses/${url}`], {});
  }

  edit(url: string) {
    this.router.navigate([`form/edit/${url}`], {});
  }
}
