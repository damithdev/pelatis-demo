import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WebNotificationService } from './web-notification.service';

export function notificationFactory(
  toastrService: ToastrService
): AbstractNotificationService {
  return new WebNotificationService(toastrService);
}

export interface INotificationService {
  showError(title: string, message: string, icon?: string):void;

  showInfo(title: string, message: string, icon?: string):void;

  showSuccess(title: string, message: string, icon?: string):void;

  showWarning(title: string, message: string, icon?: string):void;
}

@Injectable({
  providedIn: 'root',
  useFactory: notificationFactory,
  deps: [ToastrService]
})
export abstract class AbstractNotificationService
  implements INotificationService {
  abstract showError(title: string, message: string, icon?: string):void;

  abstract showInfo(title: string, message: string, icon?: string):void;

  abstract showSuccess(title: string, message: string, icon?: string):void;

  abstract showWarning(title: string, message: string, icon?: string):void;
}
