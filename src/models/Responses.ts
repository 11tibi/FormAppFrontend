import {User} from "./User";
import {Answer} from "./Answer";
import {Form} from "./Form";

export class Responses {
  public id!: number;
  public userId!: number;
  public formId!: number;
  public submittedAd!: string;
  public user!: User;
  public answers!: Answer[];
  public form!: Form;
}
