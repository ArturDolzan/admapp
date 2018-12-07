import {EventEmitter, Injectable} from '@angular/core'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifier = new EventEmitter<string>()

  notify(message: string){
    this.notifier.emit(message)
  }

}