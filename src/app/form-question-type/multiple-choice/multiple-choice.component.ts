import {Component, Input, OnInit, Output} from '@angular/core';
import {NgFor} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Checkbox} from "../../../models/Checkbox";
import {Options} from "../../../models/Options";

@Component({
  selector: 'app-multiple-choice',
  standalone: true,
  imports: [
    NgFor,
    FormsModule
  ],
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.css'
})
export class MultipleChoiceComponent implements OnInit {
  @Input() id!: number;
  @Input() @Output() checkbox!: Checkbox;

  constructor() {
  }

  ngOnInit(): void {
    // this.checkbox = new Checkbox(this.id, 2);
  }

  setRequired() {
    this.checkbox.IsRequired = !this.checkbox.IsRequired;
  }

  addChoice() {
    this.checkbox.Choices.push(new Options(-1, -1,`Choice ${this.checkbox.Choices.length + 1}`));
  }

  delete(index: number) {
    this.checkbox.Choices.splice(index, 1);
  }

  trackByFn(index: number) {
    return index;
  }
}
