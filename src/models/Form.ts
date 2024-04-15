import {Question} from "./Question";

export class Form {
  public id!: number;
  public userId!: number;
  public title!: string;
  public url!: string;
  public isOpen!: string;
  public questions!: Question[];

  constructor() {

  }
}
