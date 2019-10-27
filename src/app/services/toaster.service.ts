import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastrService: NbToastrService) { }

  showSuccess(message: string, title: string) {
    const status: string = 'success';
    this.toastrService.success(message, title, {destroyByClick: true});
  }

  showError(message: string, title: string) {
    const status: string = 'danger';
    this.toastrService.danger(message, title, {destroyByClick: true});
  }

  showInfo(message: string, title: string) {
    const status: string = 'info';
    this.toastrService.info(message, title, {destroyByClick: true});
  }

  showWarning(message: string, title: string) {
    const status: string = 'warning';
    this.toastrService.warning(message, title, {destroyByClick: true});
  }

  showPrimary(message: string, title: string) {
    const status: string = 'primary';
    this.toastrService.show(message, title, {destroyByClick: true});
  }
}
