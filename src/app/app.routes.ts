import {Routes} from '@angular/router';
import {SignupComponent} from "./authentication/signup/signup.component";
import {CreateFormComponent} from "./form/create-form/create-form.component";
import {ViewFormsComponent} from "./form/view-forms/view-forms.component";
import {ShowFormComponent} from "./form/show-form/show-form.component";
import {ShowResponsesComponent} from "./responses/show-responses/show-responses.component";
import {ShowResponseComponent} from "./responses/show-response/show-response.component";
import {UpdateFormComponent} from "./form/update-form/update-form.component";

export const routes: Routes = [
  {path: "authentication/signup", component: SignupComponent, title: "Sign Up"},
  {path: "create", component: CreateFormComponent, title: "Create new form"},
  {path: "view-forms", component: ViewFormsComponent, title: "Forms"},
  {path: "form/:url", component: ShowFormComponent, title: "Form"},
  {path: "responses/:url", component: ShowResponsesComponent, title: "Responses"},
  {path: "response/:url", component: ShowResponseComponent, title: "Response"},
  {path: "form/edit/:url", component: UpdateFormComponent, title: "Edit Form"},
];
