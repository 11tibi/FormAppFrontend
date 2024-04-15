export class Options {
  public id: number;
  public questionId: number;
  public optionText: string;

  constructor(id: number, questionId: number, optionText: string) {
    this.id = id;
    this.questionId = questionId;
    this.optionText = optionText;
  }
}
