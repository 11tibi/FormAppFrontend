import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {ModalService} from "./confirmation-modal.service";

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  constructor(private modalService: ModalService) {
  }

  get open() {
    return this.modalService.isOpen;
  }

  get config() {
    return this.modalService.config;
  }

  discardWrapper(event: Event) {
    this.modalService.isOpen = false;
    if (this.config.discard) {
      this.config.discard(event);
    }
  }

  confirmWrapper(event: Event) {
    this.modalService.isOpen = false;
    if (this.config.confirm) {
      this.config.confirm(event);
    }
  }
}
