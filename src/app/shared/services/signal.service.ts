import { Injectable, signal } from '@angular/core';
import { PageName } from '../enums/page-names.enum';

@Injectable({
  providedIn: 'root'
})
export class SignalServiceService {

  private _signalCurrentPage!: any;

  constructor() {
    let initPage: PageName = PageName.HOME;
    this._signalCurrentPage = signal(initPage);
  }

  get getCurrentPage(): PageName {
    return this._signalCurrentPage();
  }

  set setCurrentPage(page: PageName) {
    this._signalCurrentPage.set(page);
  }
}
