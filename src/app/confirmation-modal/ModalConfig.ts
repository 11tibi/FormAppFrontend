export class ModalConfig {
  title?: string = '';
  description?: string = '';
  confirm?: Function = () => {};
  discard?: Function = () => {};

  constructor(title: string = '',
              description: string = '',
              confirm = null,
              discard = null) {
    if (title) this.title = title;
    if (description) this.description = description;
    if (confirm) this.confirm = confirm;
    if (discard) this.discard = discard;
  }
}
