import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css'],
})
export class AlertModalComponent {
  @Input() showModal: boolean = true;
  @Input() title: string = 'Alert';
  @Input() message: string = 'This is an alert message!';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
