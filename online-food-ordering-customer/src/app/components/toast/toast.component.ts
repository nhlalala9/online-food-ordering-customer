import { Component } from '@angular/core';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  host: { '[class.ngb-toasts]': 'true' },
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  show = true;

  constructor(public toastService: ToastService) { }

  close() {
    this.show = false;
  }
}