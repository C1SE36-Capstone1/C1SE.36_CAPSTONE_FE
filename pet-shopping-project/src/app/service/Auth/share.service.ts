import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  onLoginChange: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  emitLoginChange(status: boolean) {
    this.onLoginChange.emit(status);
  }
}
