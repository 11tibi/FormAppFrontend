import {Options} from "./Options";

export class Question {
  public id: number;
  public formId: number;
  public questionTypeId: number;
  public questionText: string;
  public isRequired: boolean;
  public sequenceNumber: number;
  public options: Options[];

  constructor(id: number, formId: number, questionTypeId: number, questionText: string, isRequired: boolean, sequenceNumber: number, options: Options[]) {
    this.id = id;
    this.formId = formId;
    this.questionTypeId = questionTypeId;
    this.questionText = questionText;
    this.isRequired = isRequired;
    this.sequenceNumber = sequenceNumber;
    this.options = options;
  }
}
