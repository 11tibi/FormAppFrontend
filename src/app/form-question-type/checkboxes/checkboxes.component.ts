import {Component, Input, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Checkbox} from "../../../models/Checkbox";
import {Options} from "../../../models/Options";
@Component({
  selector: 'app-checkboxes',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './checkboxes.component.html',
  styleUrl: './checkboxes.component.css'
})
export class CheckboxesComponent implements OnInit{
  @Input() id!: number;
  @Input() @Output() checkbox!: Checkbox;

  constructor() {
  }

  ngOnInit(): void {
    // this.checkbox = new Checkbox(this.id, 1);
  }

  setRequired() {
    this.checkbox.IsRequired = !this.checkbox.IsRequired;
  }

  addChoice() {
    this.checkbox.Choices.push(new Options(-1, -1, `Choice ${this.checkbox.Choices.length + 1}`));
  }

  delete(index: number) {
    this.checkbox.Choices.splice(index, 1);
  }

  trackByFn(index: number){
    return index;
  }
}
