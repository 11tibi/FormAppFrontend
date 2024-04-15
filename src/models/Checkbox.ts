import {Options} from "./Options";

export class Checkbox {
  public Id!: number;
  public QuestionText!: string;
  public Choices!: Options[];
  public QuestionType!: number;
  public IsRequired!: boolean;
  public Op: string;

  constructor(id: number = -1, question_type: number = -1, question: string = "",
              option: Options[] = [new Options(-1, -1, "Option 1"),
                new Options(-1, -1, "Option 2")], IsRequired: boolean = true, Op: string = "") {
    this.Id = id;
    this.QuestionText = question;
    this.Choices = option;
    this.QuestionType = question_type;
    this.IsRequired = IsRequired;
    this.Op = Op;
  }
}
