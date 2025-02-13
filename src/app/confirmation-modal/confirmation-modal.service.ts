import { Injectable } from '@angular/core';
import {ModalConfig} from "./ModalConfig";

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isOpen = false;
  config = new ModalConfig();

  constructor() {}

  open(config: ModalConfig) {
    this.config = { ...this.config, ...config };
    this.isOpen = true;
  }
}
